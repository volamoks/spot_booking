import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const cardVariants = cva('rounded-lg border bg-card text-card-foreground shadow-sm', {
    variants: {
        variant: {
            default: 'border',
            outline: 'border-2 border-primary',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

export interface CardProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof cardVariants> {
    asChild?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'div';
        return (
            <Comp
                className={cn(cardVariants({ variant, className }))}
                ref={ref}
                {...props}
            />
        );
    },
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            className={cn('flex flex-col space-y-1.5 p-6', className)}
            ref={ref}
            {...props}
        />
    ),
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <h1
        className={cn('text-lg font-semibold leading-none tracking-tight', className)}
        ref={ref}
        {...props}
    />
));
CardTitle.displayName = 'CardTitle';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            className={cn('p-6 pt-0', className)}
            ref={ref}
            {...props}
        />
    ),
);
CardContent.displayName = 'CardContent';

export { Card, CardHeader, CardTitle, CardContent, cardVariants };
