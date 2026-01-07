'use client';

interface UserAvatarProps {
    name: string;
    size?: string;
    className?: string;
    isVerified?: boolean;
}

export default function UserAvatar({ name, size = '10', className = '', isVerified = false }: UserAvatarProps) {
    // Generate a consistent color based on the name
    const colors = [
        'from-yellow-400 to-orange-500',
        'from-amber-300 to-yellow-600',
        'from-orange-400 to-red-500',
        'from-yellow-200 to-amber-400',
        'from-yellow-500 to-yellow-700',
        'from-primary to-orange-300',
        'from-yellow-600 to-amber-800',
    ];

    // Simple hash for consistent colors
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const gradient = colors[hash % colors.length];
    const initial = name.charAt(0).toUpperCase();

    // Mapping size string to Tailwind classes if it's a numeric-like string
    // Or just use it directly in a template literal if it's a standard size
    const sizeClasses = {
        '6': 'h-6 w-6 text-[10px]',
        '8': 'h-8 w-8 text-xs',
        '10': 'h-10 w-10 text-base',
        '12': 'h-12 w-12 text-lg',
    }[size] || `h-${size} w-${size}`;

    return (
        <div className={`shrink-0 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center font-bold text-black shadow-lg shadow-black/20 ring-1 ring-white/10 overflow-hidden relative group cursor-pointer ${sizeClasses} ${className}`}>
            <span className="relative z-10 transition-transform group-hover:scale-110 drop-shadow-sm">{initial}</span>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Glossy Overlay */}
            <div className="absolute -top-1/2 -left-1/2 h-full w-full bg-white/10 rotate-45 transform pointer-events-none" />

            {isVerified && (
                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-blue-500 border border-black flex items-center justify-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
                </div>
            )}
        </div>
    );
}
