export interface User {
    id: number;
    email: string;
    name: string;
    phone?: string;
    region?: string;
    sns_type?: string;
    sns_url?: string;
    role?: 'user' | 'admin';
    created_at: string;
    updated_at?: string;
}

export interface UserProfile extends User {
    bookmarks_count: number;
    applications_count: number;
} 