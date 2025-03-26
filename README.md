# Minecraft Map Converter

A web application that converts PNG images into Minecraft .litematic files by scaling down the image and mapping colors to Minecraft blocks.

## How It Works

1. Upload a PNG image file
2. The application processes the image by compressing 8×8 pixel blocks into a single block
3. For each block, the average color is calculated and mapped to the closest Minecraft block color
4. A .litematic file is generated that you can import into Minecraft using the Litematica mod

## Technologies Used

- Next.js (React framework)
- TypeScript
- TailwindCSS for styling

## Features

- Client-side processing (no server upload required)
- Automatic color mapping to Minecraft blocks
- Preview of uploaded images
- Download .litematic files for use with the Litematica mod

## Development

### Prerequisites

- Node.js 18+ and pnpm

### Setup

```bash
# Clone the repository
git clone https://github.com/your-username/mc-mapconv.git
cd mc-mapconv

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

### Building for Production

```bash
# Build the app
pnpm build

# Run the production build locally
pnpm start
```

## Limitations and Future Improvements

- This is a simplified implementation of the .litematic format and may not be fully compatible with all versions of the Litematica mod
- The color mapping is basic and could be improved with a more comprehensive database of Minecraft block colors
- Currently only supports basic block types (concrete blocks)
- Future improvements could include:
  - Support for more block types
  - Custom block mappings
  - Dithering options for better color representation
  - 3D structure support (instead of flat maps)

## License

MIT

## Acknowledgements

- This app is meant for educational purposes
- Minecraft is a registered trademark of Mojang Studios
- Litematica mod by masady




## Ideas

- [ ] image compressor
  - [ ] format changer
- [ ] video compressor?
  - [ ] format changer?
- [ ] image to litematic
  - [ ] select block pallet
- [ ] pdf compression