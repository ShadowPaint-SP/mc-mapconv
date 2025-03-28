import { write, type IntTag, type ListTag, Int32 } from "nbtify"
import { gzip } from "zlib"
import { ColorMap, type BlockState } from './colorMap';


/**
 * Converts a 2D array of pixel colors into a 2D array of block states using the provided color map.
 * Each pixel's color (a hex string) is mapped to a block state. If the color is not found in the map,
 * it defaults to air.
 */
export function convertImageToBlocks(
  pixels: string[][]
): BlockState[][] {
  const height = pixels.length
  if (height === 0) return []
  
  const firstRow = pixels[0]
  if (!firstRow) throw new Error("First row of pixels is undefined")
  
  const width = firstRow.length
  const blocks: BlockState[][] = []

  for (let z = 0; z < height; z++) {
    const currentRow = pixels[z]
    if (!currentRow) {
      throw new Error(`Row ${z} is undefined.`)
    }
    if (currentRow.length !== width) {
      throw new Error(`Row ${z} length mismatch; expected ${width} but got ${currentRow.length}`)
    }
    
    const rowBlocks: BlockState[] = []
    for (let x = 0; x < width; x++) {
      const color = currentRow[x]
      if (color === undefined) {
        throw new Error(`Undefined color at row ${z}, column ${x}`)
      }
      const mapping = ColorMap[color]
      if (mapping !== undefined) {
        rowBlocks.push(mapping.blockState)
      } else {
        // Default to air if color not found
        rowBlocks.push({ Name: "minecraft:stone" })
      }
    }
    blocks.push(rowBlocks)
  }

  return blocks
}

export interface Structure {
  DataVersion: IntTag;
  size: ListTag<IntTag>;
  entities: ListTag<undefined>
  palette: ListTag<BlockState>;
  blocks: ListTag<{
    pos: ListTag<IntTag>;
    state: IntTag;
  }>;
}

/**
 * Converts a 2D array of blocks into a Minecraft structure NBT format.
 * The structure format is documented at: https://minecraft.wiki/w/Structure_file
 */
export async function createStructureFromBlocks(blocks2D: BlockState[][]): Promise<Uint8Array> {
  const length = blocks2D.length // Z dimension
  if (length === 0) {
    throw new Error("Empty block data")
  }
  
  const firstRow = blocks2D[0]
  if (!firstRow) {
    throw new Error("Invalid block data: missing first row")
  }
  
  const width = firstRow.length // X dimension
  const height = 1 // Y dimension (flat image)

  // Create palette of unique block states
  const paletteMap = new Map<string, number>()
  const palette: BlockState[] = []
  
  // Add air as the first block state (index 0)
  const airState = { Name: "minecraft:air" }
  paletteMap.set(JSON.stringify(airState), 0)
  palette.push(airState)

  // Collect blocks and build palette
  const structureBlocks: { pos: ListTag<IntTag>; state: IntTag }[] = []
  
  for (let z = 0; z < length; z++) {
    const row = blocks2D[z]
    if (!row) continue
    
    for (let x = 0; x < width; x++) {
      const blockState = row[x]
      if (!blockState) continue
      
      // Skip air blocks to save space
      if (blockState.Name === "minecraft:air") continue
      
      const blockStateKey = JSON.stringify(blockState)
      let paletteIndex = paletteMap.get(blockStateKey)
      
      if (paletteIndex === undefined) {
        paletteIndex = palette.length
        paletteMap.set(blockStateKey, paletteIndex)
        palette.push(blockState)
      }

      // Add block to structure (Y=0 for flat image)
      structureBlocks.push({
        pos: [new Int32(x), new Int32(0), new Int32(z)],
        state: new Int32(paletteIndex)
      })
    }
  }
  // Create final structure object
  const structure: Structure = {
    DataVersion: new Int32(3953),
    blocks: structureBlocks,
    entities: [],
    palette: palette,
    size: [new Int32(width), new Int32(height), new Int32(length)]
  }

  // Convert to NBT binary format
  const buffer = await write(structure)

  // Compress the buffer using gzip
  const compressedBuffer = await new Promise<Uint8Array>((resolve, reject) => {
    gzip(buffer, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(new Uint8Array(result));
      }
    });
  });


  return compressedBuffer
}