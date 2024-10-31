interface Course {
  name: string;
  code: string;
  institution: string;
  cricos: string;
  duration: string;
  annualFee: number;
}

interface CourseResponse {
  courses: Course[];
}

export const governmentDataService = {
  async getRegisteredCourses(): Promise<CourseResponse> {
    return {
      courses: [
        {
          name: 'Bachelor of Information Technology',
          code: 'BIT2024',
          institution: 'University of Sydney',
          cricos: '00026A',
          duration: '3 years',
          annualFee: 45000,
        },
        {
          name: 'Master of Data Science',
          code: 'MDS2024',
          institution: 'University of Melbourne',
          cricos: '00116K',
          duration: '2 years',
          annualFee: 48000,
        },
        {
          name: 'Bachelor of Business',
          code: 'BBUS2024',
          institution: 'University of Queensland',
          cricos: '00025B',
          duration: '3 years',
          annualFee: 42000,
        },
      ],
    };
  },
};
