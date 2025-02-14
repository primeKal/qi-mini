-- Create the focusing_matrix table
CREATE TABLE public.focusing_matrix (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    first_column TEXT NOT NULL,
    second_column TEXT NOT NULL,
    first_quadrant TEXT NOT NULL,
    second_quadrant TEXT NOT NULL,
    third_quadrant TEXT NOT NULL,
    fourth_quadrant TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create the focusing_matrix_rows table
CREATE TABLE public.focusing_matrix_rows (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    matrix_id UUID REFERENCES public.focusing_matrix(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    first_value INT NOT NULL,
    second_value INT NOT NULL,
    color TEXT DEFAULT '#FFFFFF',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Index for faster lookups
CREATE INDEX idx_focusing_matrix_created_by ON public.focusing_matrix (created_by);
CREATE INDEX idx_focusing_matrix_rows_matrix_id ON public.focusing_matrix_rows (matrix_id);
