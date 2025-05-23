import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'


const publishDatePlugin = () => {
  return {
    name: 'publish-date-plugin',
    document: {
      // @ts-ignore
      actions: (prev: any, context: any) => {
        const { schemaType } = context;
        
        // Chỉ áp dụng cho bài viết
        if (schemaType !== 'post') {
          return prev;
        }
        
        return prev.map((originalAction: any) => {
          // Chỉ quan tâm đến action publish
          if (originalAction.name !== 'publish') {
            return originalAction;
          }
          
          return {
            ...originalAction,
            onHandle: async (args: any) => {
              // Nếu visibility là public, cập nhật publishedAt
              const { draft } = args;
              if (draft?.visibility === 'public') {
                const now = new Date().toISOString();
                await args.client.patch(args.id).set({ publishedAt: now }).commit();
              }
              
              // Gọi action gốc
              return originalAction.onHandle(args);
            }
          };
        });
      }
    }
  };
};

export default defineConfig({
  name: 'default',
  title: 'Portfolio',

  projectId: 'morm89ja',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), publishDatePlugin()],

  schema: {
    types: schemaTypes,
  },
})
