module.exports = {
    // ...existing code...
    async rewrites() {
        return [
            {
                source: "/api/auth/:path*",
                destination: "/api/auth/:path*",
            },
        ];
    },
    serverExternalPackages: ["@prisma/client"], // Ensure Prisma is included in server components
};
