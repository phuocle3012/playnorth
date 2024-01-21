/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cloudinary.kansino.nl', 'cdn-kansino-staging-cdn-bucket.s3.eu-central-1.amazonaws.com', 'shared-infra-staging-cms-uploads-bucket.s3.eu-central-1.amazonaws.com'],
  },
}

module.exports = nextConfig
