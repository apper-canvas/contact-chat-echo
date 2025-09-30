const activityService = {
  getAll: async () => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "timestamp_c"}},
          {"field": {"Name": "contact_id_c"}},
          {"field": {"Name": "deal_id_c"}}
        ],
        orderBy: [{"fieldName": "timestamp_c", "sorttype": "DESC"}],
        pagingInfo: {"limit": 100, "offset": 0}
      };

      const response = await apperClient.fetchRecords('activity_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching activities:", error?.response?.data?.message || error.message);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "timestamp_c"}},
          {"field": {"Name": "contact_id_c"}},
          {"field": {"Name": "deal_id_c"}}
        ]
      };

      const response = await apperClient.getRecordById('activity_c', parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching activity ${id}:`, error?.response?.data?.message || error.message);
      throw error;
    }
  },

  create: async (activityData) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          type_c: activityData.type || activityData.type_c,
          description_c: activityData.description || activityData.description_c,
          timestamp_c: activityData.timestamp || activityData.timestamp_c || new Date().toISOString(),
          contact_id_c: activityData.contactId ? parseInt(activityData.contactId) : (activityData.contact_id_c ? parseInt(activityData.contact_id_c) : null),
          deal_id_c: activityData.dealId ? parseInt(activityData.dealId) : (activityData.deal_id_c ? parseInt(activityData.deal_id_c) : null)
        }]
      };

      const response = await apperClient.createRecord('activity_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        if (successful.length > 0) {
          return successful[0].data;
        }
        const failed = response.results.filter(r => !r.success);
        if (failed.length > 0) {
          console.error(`Failed to create activity:`, failed);
          throw new Error(failed[0].message || 'Failed to create activity');
        }
      }

      throw new Error('Unexpected response format');
    } catch (error) {
      console.error("Error creating activity:", error?.response?.data?.message || error.message);
      throw error;
    }
  },

  update: async (id, activityData) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const updateData = {
        Id: parseInt(id)
      };

      if (activityData.type || activityData.type_c) {
        updateData.type_c = activityData.type || activityData.type_c;
      }
      if (activityData.description || activityData.description_c) {
        updateData.description_c = activityData.description || activityData.description_c;
      }
      if (activityData.timestamp || activityData.timestamp_c) {
        updateData.timestamp_c = activityData.timestamp || activityData.timestamp_c;
      }
      if (activityData.contactId !== undefined || activityData.contact_id_c !== undefined) {
        const contactId = activityData.contactId || activityData.contact_id_c;
        updateData.contact_id_c = contactId ? parseInt(contactId) : null;
      }
      if (activityData.dealId !== undefined || activityData.deal_id_c !== undefined) {
        const dealId = activityData.dealId || activityData.deal_id_c;
        updateData.deal_id_c = dealId ? parseInt(dealId) : null;
      }

      const params = {
        records: [updateData]
      };

      const response = await apperClient.updateRecord('activity_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        if (successful.length > 0) {
          return successful[0].data;
        }
        const failed = response.results.filter(r => !r.success);
        if (failed.length > 0) {
          console.error(`Failed to update activity:`, failed);
          throw new Error(failed[0].message || 'Failed to update activity');
        }
      }

      throw new Error('Unexpected response format');
    } catch (error) {
      console.error("Error updating activity:", error?.response?.data?.message || error.message);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = { 
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord('activity_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        if (successful.length > 0) {
          return successful[0].data;
        }
        const failed = response.results.filter(r => !r.success);
        if (failed.length > 0) {
          console.error(`Failed to delete activity:`, failed);
          throw new Error(failed[0].message || 'Failed to delete activity');
        }
      }

      return true;
    } catch (error) {
      console.error("Error deleting activity:", error?.response?.data?.message || error.message);
      throw error;
    }
  }
};

export default activityService;