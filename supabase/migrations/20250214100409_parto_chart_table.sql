-- Create pareto_charts table
CREATE TABLE public.pareto_charts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    sample_title TEXT NOT NULL,
    sample_description TEXT,
    sample_size INT NOT NULL CHECK (sample_size >= 0),
    first_column TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create pareto_chart_rows table
CREATE TABLE public.pareto_chart_rows (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    chart_id UUID REFERENCES public.pareto_charts(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    first_column_data INT NOT NULL CHECK (first_column_data >= 0),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_pareto_charts_created_by ON public.pareto_charts (created_by);
CREATE INDEX idx_pareto_chart_rows_chart_id ON public.pareto_chart_rows (chart_id);
