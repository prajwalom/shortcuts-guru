import { useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';

export interface Shortcut {
  id: string;
  title: string;
  description?: string;
  shortcut_key: string;
  platform: string;
  category: string;
  app_name?: string;
  tags?: string[];
}

interface UseShortcutsProps {
  searchQuery?: string;
  platforms?: string[];
  categories?: string[];
  apps?: string[];
}

export const useShortcuts = ({ 
  searchQuery = '', 
  platforms = [], 
  categories = [],
  apps = []
}: UseShortcutsProps = {}) => {
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchShortcuts();
  }, [searchQuery, platforms, categories, apps]);

  const fetchShortcuts = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('shortcuts')
        .select('*')
        .order('title');

      
      if (searchQuery) {
        query = query.or(
          `title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%,tags.cs.{${searchQuery}}`
        );
      }

      
      if (platforms.length > 0) {
        query = query.in('platform', platforms);
      }

     
      if (categories.length > 0) {
        query = query.in('category', categories);
      }

    
      if (apps.length > 0) {
        query = query.in('app_name', apps);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) {
        setError(fetchError.message);
        console.error('Error fetching shortcuts:', fetchError);
        return;
      }

      setShortcuts(data || []);
    } catch (err) {
      setError('Failed to fetch shortcuts');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchShortcuts();
  };

  return {
    shortcuts,
    loading,
    error,
    refetch
  };
};