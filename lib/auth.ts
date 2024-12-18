import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

interface JWTPayload {
    userId: string;
    role: string;
}

export interface AuthInfo {
    userId: string;
    role: string;
}

export async function verifyAuth(request: NextRequest): Promise<AuthInfo | NextResponse> {
    try {
        const authHeader = request.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as JWTPayload;

        return {
            userId: decoded.userId,
            role: decoded.role
        };
    } catch (error) {
        console.error('Auth error:', error);
        return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }
}

export function withAuth(
    handler: (request: NextRequest & { auth: AuthInfo }) => Promise<NextResponse>
): (request: NextRequest) => Promise<NextResponse> {
    return async function(request: NextRequest): Promise<NextResponse> {
        const auth = await verifyAuth(request);
        
        if (auth instanceof NextResponse) {
            return auth; // Return error response if authentication failed
        }

        // Add auth info to request context
        const requestWithAuth = Object.assign(request, { auth });
        
        return handler(requestWithAuth);
    }
}
