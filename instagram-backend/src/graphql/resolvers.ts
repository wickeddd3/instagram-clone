import { supabase } from "../supabase";

export const resolvers = {
  Query: {
    // Fetch all posts and join with user data
    getFeed: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select(
          `
          *,
          user:profiles(*)
        `
        )
        .order("created_at", { ascending: false });

      if (error) throw new Error(error.message);
      return data;
    },

    getProfile: async (_: any, { id }: { id: string }) => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw new Error(error.message);
      return data;
    },
  },

  Mutation: {
    createPost: async (
      _: any,
      args: { userId: string; imageUrl: string; caption: string }
    ) => {
      const { data, error } = await supabase
        .from("posts")
        .insert([
          {
            user_id: args.userId,
            image_url: args.imageUrl,
            caption: args.caption,
          },
        ])
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data;
    },

    // Useful for syncing Supabase Auth user to our public Profile table
    createProfile: async (
      _: any,
      args: { id: string; username: string; avatarUrl: string }
    ) => {
      const { data, error } = await supabase
        .from("profiles")
        .insert([
          { id: args.id, username: args.username, avatar_url: args.avatarUrl },
        ])
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data;
    },
  },
};
