# Minecraft Map Converter

A web application that converts PNG images into Minecraft .nbt files by scaling down the image and mapping colors to Minecraft blocks.

## How It Works

1. Upload a PNG image file
2. The application processes the image by compressing 8×8 pixel blocks into a single block
3. For each block, the average color is calculated and mapped to the closest Minecraft block color
4. A .litematic file is generated that you can import into Minecraft using the Litematica mod

## Technologies Used

- Next.js
- TypeScript
- TailwindCSS for styling

## Features

- Client-side processing (no server upload required)
- Automatic color mapping to Minecraft blocks
- Preview of uploaded images
- Download .litematic files for use with the Litematica mod

## Limitations and Future Improvements

- This is a simplified implementation of the .litematic format and may not be fully compatible with all versions of the Litematica mod
- The color mapping is basic and could be improved with a more comprehensive database of Minecraft block colors
- Currently only supports basic block types (concrete blocks)
- Future improvements could include:
  - Support for more block types
  - Custom block mappings
  - Dithering options for better color representation
  - 3D structure support (instead of flat maps)

## Acknowledgements

- This app is meant for educational purposes
- Minecraft is a registered trademark of Mojang Studios
- Litematica mod by masady

## Reference

- [Structure File Format](https://minecraft.wiki/w/Structure_file)
- [NBT node package used](https://github.com/Offroaders123/NBTify)
- [NBT viewer](https://irath96.github.io/webNBT/)


## Ideas

- [ ] image compressor
  - [ ] format changer
- [ ] video compressor?
  - [ ] format changer?
- [ ] image to litematic
  - [ ] select block pallet
- [ ] pdf compression