export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      focusing_matrix: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          first_column: string
          first_quadrant: string
          fourth_quadrant: string
          id: string
          second_column: string
          second_quadrant: string
          third_quadrant: string
          title: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          first_column: string
          first_quadrant: string
          fourth_quadrant: string
          id?: string
          second_column: string
          second_quadrant: string
          third_quadrant: string
          title: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          first_column?: string
          first_quadrant?: string
          fourth_quadrant?: string
          id?: string
          second_column?: string
          second_quadrant?: string
          third_quadrant?: string
          title?: string
        }
        Relationships: []
      }
      focusing_matrix_rows: {
        Row: {
          color: string | null
          created_at: string | null
          first_value: number
          id: string
          matrix_id: string | null
          name: string
          second_value: number
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          first_value: number
          id?: string
          matrix_id?: string | null
          name: string
          second_value: number
        }
        Update: {
          color?: string | null
          created_at?: string | null
          first_value?: number
          id?: string
          matrix_id?: string | null
          name?: string
          second_value?: number
        }
        Relationships: [
          {
            foreignKeyName: "focusing_matrix_rows_matrix_id_fkey"
            columns: ["matrix_id"]
            isOneToOne: false
            referencedRelation: "focusing_matrix"
            referencedColumns: ["id"]
          },
        ]
      }
      imr_chart_rows: {
        Row: {
          chart_id: string | null
          created_at: string | null
          id: string
          moving_range: number | null
          timestamp: string
          value: number
        }
        Insert: {
          chart_id?: string | null
          created_at?: string | null
          id?: string
          moving_range?: number | null
          timestamp: string
          value: number
        }
        Update: {
          chart_id?: string | null
          created_at?: string | null
          id?: string
          moving_range?: number | null
          timestamp?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "imr_chart_rows_chart_id_fkey"
            columns: ["chart_id"]
            isOneToOne: false
            referencedRelation: "imr_charts"
            referencedColumns: ["id"]
          },
        ]
      }
      imr_charts: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          lcl_i: number | null
          lcl_mr: number | null
          mean: number | null
          title: string
          ucl_i: number | null
          ucl_mr: number | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          lcl_i?: number | null
          lcl_mr?: number | null
          mean?: number | null
          title: string
          ucl_i?: number | null
          ucl_mr?: number | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          lcl_i?: number | null
          lcl_mr?: number | null
          mean?: number | null
          title?: string
          ucl_i?: number | null
          ucl_mr?: number | null
        }
        Relationships: []
      }
      pareto_chart_rows: {
        Row: {
          chart_id: string | null
          created_at: string | null
          first_column_data: number
          id: string
          name: string
        }
        Insert: {
          chart_id?: string | null
          created_at?: string | null
          first_column_data: number
          id?: string
          name: string
        }
        Update: {
          chart_id?: string | null
          created_at?: string | null
          first_column_data?: number
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "pareto_chart_rows_chart_id_fkey"
            columns: ["chart_id"]
            isOneToOne: false
            referencedRelation: "pareto_charts"
            referencedColumns: ["id"]
          },
        ]
      }
      pareto_charts: {
        Row: {
          created_at: string | null
          created_by: string | null
          first_column: string
          id: string
          sample_description: string | null
          sample_size: number
          sample_title: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          first_column: string
          id?: string
          sample_description?: string | null
          sample_size: number
          sample_title: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          first_column?: string
          id?: string
          sample_description?: string | null
          sample_size?: number
          sample_title?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          first_name: string | null
          id: string
          last_name: string | null
          subscription_tier: Database["public"]["Enums"]["subscription_tier"]
        }
        Insert: {
          first_name?: string | null
          id: string
          last_name?: string | null
          subscription_tier?: Database["public"]["Enums"]["subscription_tier"]
        }
        Update: {
          first_name?: string | null
          id?: string
          last_name?: string | null
          subscription_tier?: Database["public"]["Enums"]["subscription_tier"]
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      subscription_tier: "free" | "paid"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          user_metadata: Json | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          user_metadata?: Json | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          user_metadata?: Json | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads: {
        Row: {
          bucket_id: string
          created_at: string
          id: string
          in_progress_size: number
          key: string
          owner_id: string | null
          upload_signature: string
          user_metadata: Json | null
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          id: string
          in_progress_size?: number
          key: string
          owner_id?: string | null
          upload_signature: string
          user_metadata?: Json | null
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          id?: string
          in_progress_size?: number
          key?: string
          owner_id?: string | null
          upload_signature?: string
          user_metadata?: Json | null
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads_parts: {
        Row: {
          bucket_id: string
          created_at: string
          etag: string
          id: string
          key: string
          owner_id: string | null
          part_number: number
          size: number
          upload_id: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          etag: string
          id?: string
          key: string
          owner_id?: string | null
          part_number: number
          size?: number
          upload_id: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          etag?: string
          id?: string
          key?: string
          owner_id?: string | null
          part_number?: number
          size?: number
          upload_id?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_parts_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "s3_multipart_uploads_parts_upload_id_fkey"
            columns: ["upload_id"]
            isOneToOne: false
            referencedRelation: "s3_multipart_uploads"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      list_multipart_uploads_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          next_key_token?: string
          next_upload_token?: string
        }
        Returns: {
          key: string
          id: string
          created_at: string
        }[]
      }
      list_objects_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          start_after?: string
          next_token?: string
        }
        Returns: {
          name: string
          id: string
          metadata: Json
          updated_at: string
        }[]
      }
      operation: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
