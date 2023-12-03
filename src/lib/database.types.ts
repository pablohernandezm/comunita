export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Communities: {
        Row: {
          bannerSRC: string | null
          created_at: string
          description: string
          id: string
          n_admins: number | null
          n_mods: number | null
          n_regular_members: number | null
          name: string
          total_members: number | null
        }
        Insert: {
          bannerSRC?: string | null
          created_at?: string
          description: string
          id?: string
          n_admins?: number | null
          n_mods?: number | null
          n_regular_members?: number | null
          name: string
          total_members?: number | null
        }
        Update: {
          bannerSRC?: string | null
          created_at?: string
          description?: string
          id?: string
          n_admins?: number | null
          n_mods?: number | null
          n_regular_members?: number | null
          name?: string
          total_members?: number | null
        }
        Relationships: []
      }
      Memberships: {
        Row: {
          community_id: string
          created_at: string
          id: string
          member_id: string
          user_role: Database["public"]["Enums"]["community_role"]
        }
        Insert: {
          community_id: string
          created_at?: string
          id?: string
          member_id: string
          user_role?: Database["public"]["Enums"]["community_role"]
        }
        Update: {
          community_id?: string
          created_at?: string
          id?: string
          member_id?: string
          user_role?: Database["public"]["Enums"]["community_role"]
        }
        Relationships: [
          {
            foreignKeyName: "Memberships_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "Communities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Memberships_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "Profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      Notices: {
        Row: {
          author_id: string
          body: string
          community_id: string
          created_at: string
          notice_id: string
          title: string
        }
        Insert: {
          author_id: string
          body: string
          community_id: string
          created_at?: string
          notice_id?: string
          title: string
        }
        Update: {
          author_id?: string
          body?: string
          community_id?: string
          created_at?: string
          notice_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "Notices_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "Profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Notices_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "Communities"
            referencedColumns: ["id"]
          }
        ]
      }
      Posts: {
        Row: {
          authorID: string
          body: string
          communityID: string
          created_at: string
          id: string
          imagesSRC: string[] | null
        }
        Insert: {
          authorID: string
          body: string
          communityID: string
          created_at?: string
          id?: string
          imagesSRC?: string[] | null
        }
        Update: {
          authorID?: string
          body?: string
          communityID?: string
          created_at?: string
          id?: string
          imagesSRC?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "Posts_authorID_fkey"
            columns: ["authorID"]
            isOneToOne: false
            referencedRelation: "Profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Posts_communityID_fkey"
            columns: ["communityID"]
            isOneToOne: false
            referencedRelation: "Communities"
            referencedColumns: ["id"]
          }
        ]
      }
      Profiles: {
        Row: {
          avatarSrc: string | null
          biography: string | null
          birthdate: string | null
          coverSrc: string | null
          created_at: string
          id: string
          name: string
        }
        Insert: {
          avatarSrc?: string | null
          biography?: string | null
          birthdate?: string | null
          coverSrc?: string | null
          created_at?: string
          id?: string
          name?: string
        }
        Update: {
          avatarSrc?: string | null
          biography?: string | null
          birthdate?: string | null
          coverSrc?: string | null
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "Profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_profile_object: {
        Args: {
          object_url: string
        }
        Returns: Record<string, unknown>
      }
      delete_storage_object: {
        Args: {
          bucket: string
          object: string
        }
        Returns: Record<string, unknown>
      }
      get_admin_avatar: {
        Args: {
          _community_id: string
        }
        Returns: {
          avatarsrc: string
        }[]
      }
      get_user_email: {
        Args: {
          _id: string
        }
        Returns: {
          email: string
        }[]
      }
      shared_communities: {
        Args: {
          member1_id: string
          member2_id: string
        }
        Returns: {
          community_id: string
          community_name: string
          description: string
          banner_src: string
          total_members: number
          n_admins: number
          n_mods: number
          n_regular_members: number
          adminsrc: string
        }[]
      }
      user_communities: {
        Args: Record<PropertyKey, never>
        Returns: {
          community_id: string
          community_name: string
          description: string
          banner_src: string
          total_members: number
          n_admins: number
          n_mods: number
          n_regular_members: number
          adminsrc: string
        }[]
      }
    }
    Enums: {
      community_role: "admin" | "mod" | "regular"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
