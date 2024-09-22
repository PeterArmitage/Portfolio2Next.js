import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(mp4|webm)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/media',
          outputPath: `${isServer ? '../' : ''}static/media`,
          name: '[name].[hash].[ext]',
        },
      },
    });

    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'app/styles')],
  },
};

export default nextConfig;