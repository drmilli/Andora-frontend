import axios from 'axios';

const BASE_URL = 'https://fedskillstest.coalitiontechnologies.workers.dev';
const AUTH_HEADER = `Basic ${btoa('coalition:skills-test')}`;

export interface DiagnosisHistory {
  month: string;
  year: number;
  blood_pressure: {
    systolic: { value: number; levels: string };
    diastolic: { value: number; levels: string };
  };
  heart_rate: { value: number; levels: string };
  respiratory_rate: { value: number; levels: string };
  temperature: { value: number; levels: string };
}

export interface DiagnosticList {
  name: string;
  description: string;
  status: string;
}

export interface Patient {
  name: string;
  gender: string;
  age: number;
  profile_picture: string;
  date_of_birth: string;
  phone_number: string;
  emergency_contact: string;
  insurance_type: string;
  diagnosis_history: DiagnosisHistory[];
  diagnostic_list: DiagnosticList[];
  lab_results: string[];
}

export const fetchJessicaTaylor = async (): Promise<Patient | null> => {
  try {
    const response = await axios.get<Patient[]>(BASE_URL, {
      headers: {
        Authorization: AUTH_HEADER,
      },
    });
    
    // Filter for Jessica Taylor as per instructions
    const jessica = response.data.find(p => p.name === 'Jessica Taylor');
    return jessica || null;
  } catch (error) {
    console.error('Error fetching patient data:', error);
    return null;
  }
};
