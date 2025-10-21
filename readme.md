# image_2_particles

**image_2_particles** is a lightweight React component that converts images (`.png`, `.jpg`, `.jpeg`, `.webp`, etc.) into an interactive particle animation. Particles repel from the mouse cursor and smoothly return to their original positions using the Canvas API and React. This component is ideal for adding engaging visual effects to web applications.

## Features

- Interactive particle animations that respond to mouse movement.
- Lightweight and optimized for performance with the Canvas API.
- Highly customizable via props for particle spacing, size, repulsion radius, and more.
- Responsive design with automatic scaling for different screen sizes.
- Supports multiple image formats: PNG, JPEG, WEBP, and SVG (rasterized by the browser).
- Licensed under MIT for flexible use in personal and commercial projects.

## Installation

Install the package using npm or yarn:

```bash
npm install image_2_particles
```

```bash
yarn add image_2_particles
```

## Basic Usage

Below is a minimal example to create an interactive particle animation from an image:

```jsx
import React from "react";
import ParticleImage from "image_2_particles";
import logo from "./assets/logo.png";

export default function App() {
  return (
    <div
      style={{
        background: "#000",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ParticleImage
        src={logo}
        spacing={10}
        size={3}
        repelRadius={100}
        background="#000"
      />
    </div>
  );
}
```

## Props

The component supports the following props for customization:

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `src` | string | required | Path or URL to the image (supports PNG, JPG, WEBP, etc.). |
| `spacing` | number | 12 | Distance between sampled pixels (smaller values increase particle count). |
| `size` | number | 3 | Radius of each particle. |
| `repelRadius` | number | 150 | Radius around the mouse where particles repel. |
| `returnForce` | number | 0.08 | Speed at which particles return to their original position. |
| `damping` | number | 0.9 | Smooths particle motion (0.8 = more elastic, 0.95 = very smooth). |
| `background` | string | "black" | Canvas background color (any valid CSS color). |
| `minAlpha` | number | 80 | Minimum pixel opacity (0–255) for inclusion in the particle system. |
| `maxWidth` | number | 800 | Maximum canvas width; scales down larger images. |
| `responsive` | boolean | true | Enables automatic canvas scaling for smaller screens. |

## Advanced Example

For a fully customized animation, use the following configuration:

```jsx
import React from "react";
import ParticleImage from "image_2_particles";
import myImage from "./assets/myLogo.webp";

export default function App() {
  return (
    <div
      style={{
        background: "#111",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ParticleImage
        src={myImage}
        spacing={8}
        size={2}
        repelRadius={120}
        returnForce={0.1}
        damping={0.92}
        background="#111"
        minAlpha={60}
        maxWidth={600}
        responsive={true}
      />
    </div>
  );
}
```

## Supported Image Formats

- PNG (transparent PNGs recommended for optimal effects)
- JPEG / JPG
- WEBP (preferred for faster loading and smaller file sizes)
- SVG (rasterized by the browser)

## How It Works

1. The image is rendered on a hidden canvas.
2. Non-transparent pixels are sampled and converted into particles.
3. Particles are dynamically drawn using the Canvas API.
4. Mouse movement triggers particle repulsion within the specified `repelRadius`, with particles returning to their original positions based on `returnForce` and `damping`.

## Performance Tips

- Increase `spacing` (e.g., from 8 to 12) to reduce the number of particles and improve performance on lower-end devices.
- Use WEBP images for faster loading and smaller file sizes.
- Keep image dimensions moderate (under 1000px wide) for smoother animations.
- Ensure `responsive={true}` for optimal scaling on mobile devices.

## License

MIT © 2025 \[Your Name or GitHub Username\]

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/new-feature`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature/new-feature`).
5. Open a pull request.

For bugs or feature requests, please open an issue at GitHub Issues.

## Get Started

Add **image_2_particles** to your project to create captivating particle animations. Install the package, configure the props, and enhance your web application with interactive visuals.