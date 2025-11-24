-- =====================================================
-- Add images array field to products table
-- =====================================================

-- Add images column (text array) to products table
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS images TEXT[] DEFAULT ARRAY[]::TEXT[];

-- Migrate existing image_url to images array
-- If image_url exists, put it as first element in images array
UPDATE public.products 
SET images = ARRAY[image_url]::TEXT[]
WHERE image_url IS NOT NULL AND image_url != '' AND (images IS NULL OR array_length(images, 1) IS NULL);

-- Make images array NOT NULL with default empty array
ALTER TABLE public.products 
ALTER COLUMN images SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN images SET NOT NULL;

-- Add comment
COMMENT ON COLUMN public.products.images IS 'Array of product image URLs. First image is the primary/featured image.';



















