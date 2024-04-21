// next.config.js
module.exports = {
  images: {
    domains: ['www.notion.so', 'lh5.googleusercontent.com', 's3-us-west-2.amazonaws.com'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            outputPath: 'static/fonts',
            publicPath: '../fonts', // Adjust this path based on your project structure
          },
        },
      ],
    });
    return config;
  },
};
