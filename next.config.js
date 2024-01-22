module.exports = {
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: "https://stocks-app-backend.vercel.app/api/:path*", // Proxy to Backend
            },
        ];
    },
};
