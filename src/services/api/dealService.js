const dealService = {
  getAll: async () => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "value_c"}},
          {"field": {"Name": "stage_c"}},
          {"field": {"Name": "probability_c"}},
          {"field": {"Name": "expected_close_date_c"}},
          {"field": {"Name": "created_at_c"}},
          {"field": {"Name": "contact_id_c"}}
        ],
        orderBy: [{"fieldName": "created_at_c", "sorttype": "DESC"}],
        pagingInfo: {"limit": 100, "offset": 0}
      };

      const response = await apperClient.fetchRecords('deal_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching deals:", error?.response?.data?.message || error.message);
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
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "value_c"}},
          {"field": {"Name": "stage_c"}},
          {"field": {"Name": "probability_c"}},
          {"field": {"Name": "expected_close_date_c"}},
          {"field": {"Name": "created_at_c"}},
          {"field": {"Name": "contact_id_c"}}
        ]
      };

      const response = await apperClient.getRecordById('deal_c', parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching deal ${id}:`, error?.response?.data?.message || error.message);
      throw error;
    }
  },

  create: async (dealData) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          title_c: dealData.title || dealData.title_c,
          value_c: parseFloat(dealData.value || dealData.value_c || 0),
          stage_c: dealData.stage || dealData.stage_c,
          probability_c: parseInt(dealData.probability || dealData.probability_c || 0),
          expected_close_date_c: dealData.expectedCloseDate || dealData.expected_close_date_c,
          contact_id_c: parseInt(dealData.contactId || dealData.contact_id_c),
          created_at_c: new Date().toISOString()
        }]
      };

      const response = await apperClient.createRecord('deal_c', params);
      
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
          console.error(`Failed to create deal:`, failed);
          throw new Error(failed[0].message || 'Failed to create deal');
        }
      }

      throw new Error('Unexpected response format');
    } catch (error) {
      console.error("Error creating deal:", error?.response?.data?.message || error.message);
      throw error;
    }
  },

  update: async (id, dealData) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const updateData = {
        Id: parseInt(id)
      };

      if (dealData.title || dealData.title_c) {
        updateData.title_c = dealData.title || dealData.title_c;
      }
      if (dealData.value !== undefined || dealData.value_c !== undefined) {
        updateData.value_c = parseFloat(dealData.value || dealData.value_c || 0);
      }
      if (dealData.stage || dealData.stage_c) {
        updateData.stage_c = dealData.stage || dealData.stage_c;
      }
      if (dealData.probability !== undefined || dealData.probability_c !== undefined) {
        updateData.probability_c = parseInt(dealData.probability || dealData.probability_c || 0);
      }
      if (dealData.expectedCloseDate || dealData.expected_close_date_c) {
        updateData.expected_close_date_c = dealData.expectedCloseDate || dealData.expected_close_date_c;
      }
      if (dealData.contactId || dealData.contact_id_c) {
        updateData.contact_id_c = parseInt(dealData.contactId || dealData.contact_id_c);
      }

      const params = {
        records: [updateData]
      };

      const response = await apperClient.updateRecord('deal_c', params);
      
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
          console.error(`Failed to update deal:`, failed);
          throw new Error(failed[0].message || 'Failed to update deal');
        }
      }

      throw new Error('Unexpected response format');
    } catch (error) {
      console.error("Error updating deal:", error?.response?.data?.message || error.message);
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

      const response = await apperClient.deleteRecord('deal_c', params);
      
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
          console.error(`Failed to delete deal:`, failed);
          throw new Error(failed[0].message || 'Failed to delete deal');
        }
      }

      return true;
    } catch (error) {
      console.error("Error deleting deal:", error?.response?.data?.message || error.message);
      throw error;
    }
  }
};

export default dealService;