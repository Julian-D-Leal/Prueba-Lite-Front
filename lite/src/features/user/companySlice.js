import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    companies: [],
};

export const fetchCompaniesAsync = createAsyncThunk(
  'company/fetchCompanies',
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/companies/`)
        return response.data;
    } catch (error) {
        console.error('Error fetching companies:', error);
        return thunkAPI.rejectWithValue(error.response.data);
    }})

    
export const addCompanyAsync = createAsyncThunk(
  'company/addCompanies',
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/companies`, data);
      alert("company added successfully");
        return response.data;
    } catch (error) {
        alert(error.response.data.nit[0]);
        console.error('Error fetching companies:', error);
        return thunkAPI.rejectWithValue(error.response.data);
        }
  })

  export const removeCompanyAsync = createAsyncThunk(
    'company/removeCompanies',
    async (id, thunkAPI) => {
        try {
            const response = await axios.delete(`${API_URL}/companies/`+id+"/");
            alert(response.data.message);
            return String(id);
        } catch (error) {
            alert(error.response.data.error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    });

export const addProductAsync = createAsyncThunk(
    'company/addProducts',
    async (data, thunkAPI) => {
        try {
            const response = await axios.post(`${API_URL}/products/`, data);
            alert("Producto agregado correctamente");
            // return response.data;
        } catch (error) {
            console.error('Error adding product:', error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    });

export const updateCompAsync = createAsyncThunk(
    'company/updateComp',
    async (data, thunkAPI) => {
        try {
            const response = await axios.put("https://lite-companies.fly.dev/api/companies/"+data.nit+"/", data);
            alert("company updated successfully");
            return response.data;
        } catch (error) {
            console.error('Error updating company:', error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    })


const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompanies: (state, action) => {
      return action.payload;
    },
    addCompany: (state, action) => {
      state.push(action.payload);
    },
    removeCompany: (state, action) => {
      return state.filter(company => company.id !== action.payload);
    },
  },
    extraReducers: (builder) => {
        builder
        .addCase(addCompanyAsync.pending, (state) => {
            // state.is_loading = true;
        })
        .addCase(addCompanyAsync.fulfilled, (state, action) => {
            // state.is_loading = false;
            // state.error = null;
            state.companies.push(action.payload);
        })
        .addCase(fetchCompaniesAsync.fulfilled, (state, action) => {
            // state.is_loading = false;
            // state.error = null;
            state.companies = action.payload;
        })
        .addCase(addCompanyAsync.rejected, (state, action) => {
            // state.is_loading = false;
            // state.error = action.payload;
        })
        .addCase(removeCompanyAsync.fulfilled, (state, action) => {
            // state.is_loading = false;
            // state.error = null;
            state.companies = state.companies.filter(company => company.nit !== action.payload);
        })
        .addCase(updateCompAsync.fulfilled, (state, action) => {
            // state.is_loading = false;
            // state.error = null;
            const index = state.companies.findIndex(company => company.nit === action.payload.nit);
            if (index !== -1) {
                state.companies[index] = action.payload;
            }
        })

    },
});

export const { setCompanies, addCompany, removeCompany } = companySlice.actions;
export default companySlice.reducer;