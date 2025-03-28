export type BlockState = {
  Name: string;
  Properties?: Record<string, string>;
}

export type BlockMapping = {
  blockState: BlockState;
}
export const ColorMap: Record<string, BlockMapping> = {
	"#000000": { 
		blockState: { 
			Name: "minecraft:black_concrete"
		}
	},
	"#FFFFFF": { 
		blockState: { 
			Name: "minecraft:white_concrete"
		}
	}
};