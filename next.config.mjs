/** @type {import('next').NextConfig} */
import dayjs from 'dayjs'

const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/' + dayjs().format('MMMMYYYY'),
        permanent: true,
      },
    ]
  },
  swcMinify: true,
  experimental: {
    appDir: true,
  },
}
  
export default nextConfig