import { useTheme } from 'next-themes';

export function useRedColor() {
    const { theme } = useTheme();

    const getRedColor = () => {
        return theme === 'dark' ? 'rgba(228, 0, 43, 0.7)' : 'rgb(228, 0, 43)';
    };

    return { getRedColor };
}
