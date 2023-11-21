import { PersonnelDataInterface } from 'src/interfaces/personnel-data.interface';
import { Observable, of } from 'rxjs';
import api from 'src/helpers/api';


export const getPersonnelData = (): Observable<PersonnelDataInterface[]> => {
  const response = [
    {
      avatarURL: 'https://i.pravatar.cc/250?img=11',
      name: 'Amirhossein Douzandeh Zenoozi',
      firstName: 'Amirhossein',
      lastName: 'Douzandeh Zenoozi',
      phoneNumber: '+989128148077',
      position: 'FrontEnd',
      organization: 'Sensifai',
      profileID: '123',
      isOnline: true,
      timestamp: 'test',
    }, {
      avatarURL: 'https://i.pravatar.cc/250?img=13',
      name: 'Mohammad Hossein Shahmohammadi',
      firstName: 'Mohammad Hossein',
      lastName: 'Shahmohammadi',
      phoneNumber: '+989122345679',
      position: 'BackEnd',
      organization: 'Sensifai',
      profileID: '124',
      isOnline: false,
      timestamp: 'test',
    }, {
      avatarURL: 'https://i.pravatar.cc/250?img=14',
      name: 'Amirsina Mandegari',
      firstName: 'Amirsina',
      lastName: 'Mandegari',
      phoneNumber: '+989128595679',
      position: 'BackEnd',
      organization: 'Sensifai',
      profileID: '125',
      isOnline: false,
      timestamp: 'test',
    }, {
      avatarURL: 'https://i.pravatar.cc/250?img=23',
      name: 'Maryam Sajedinia',
      firstName: 'Maryam',
      lastName: 'Sajedinia',
      phoneNumber: '+989128592141',
      position: 'BackEnd',
      organization: 'Sensifai',
      profileID: '126',
      isOnline: true,
      timestamp: 'test',
    }, {
      avatarURL: 'https://i.pravatar.cc/250?img=41',
      name: 'Saba Balal',
      firstName: 'Saba',
      lastName: 'Balal',
      phoneNumber: '+989128422141',
      position: 'BackEnd',
      organization: 'Sensifai',
      profileID: '127',
      isOnline: true,
      timestamp: 'test',
    }, {
      avatarURL: 'https://i.pravatar.cc/250?img=43',
      name: 'Roshanak Jamali',
      firstName: 'Roshanak',
      lastName: 'Jamali',
      phoneNumber: '+989128432141',
      position: 'FrontEnd',
      organization: 'Sensifai',
      profileID: '128',
      isOnline: false,
      timestamp: 'test',
    }, {
      avatarURL: 'https://i.pravatar.cc/250?img=8',
      name: 'Hamid Reza Garousi',
      firstName: 'Hamid Reza',
      lastName: 'Garousi',
      phoneNumber: '+989128472541',
      position: 'FrontEnd',
      organization: 'Sensifai',
      profileID: '129',
      isOnline: true,
      timestamp: 'test',
    }, {
      avatarURL: 'https://i.pravatar.cc/250?img=47',
      name: 'Niloofar Shahbaz',
      firstName: 'Niloofar',
      lastName: 'Shahbaz',
      phoneNumber: '+989129522541',
      position: 'FrontEnd',
      organization: 'Sensifai',
      profileID: '130',
      isOnline: false,
      timestamp: 'test',
    }, {
      avatarURL: 'https://i.pravatar.cc/250?img=69',
      name: 'Mostafa Shojaei',
      firstName: 'Mostafa',
      lastName: 'Shojaei',
      phoneNumber: '+989123242541',
      position: 'Project Manager',
      organization: 'Sensifai',
      profileID: '131',
      isOnline: true,
      timestamp: 'test',
    }, {
      avatarURL: 'https://i.pravatar.cc/250?img=65',
      name: 'Rahman Yousefzadeh',
      firstName: 'Rahman',
      lastName: 'Yousefzadeh',
      phoneNumber: '+989127412541',
      position: 'CTO',
      organization: 'Sensifai',
      profileID: '132',
      isOnline: false,
      timestamp: 'test',
    }, {
      avatarURL: 'https://i.pravatar.cc/250?img=60',
      name: 'Mehdi Arian',
      firstName: 'Mehdi',
      lastName: 'Arian',
      phoneNumber: '+989128532541',
      position: 'AI Engineer',
      organization: 'Sensifai',
      profileID: '133',
      isOnline: true,
      timestamp: 'test',
    }, {
      avatarURL: 'https://i.pravatar.cc/250?img=67',
      name: 'Behnam Samadi',
      firstName: 'Behnam',
      lastName: 'Samadi',
      phoneNumber: '+989121522541',
      position: 'AI Engineer',
      organization: 'Sensifai',
      profileID: '134',
      isOnline: true,
      timestamp: 'test',
    }, {
      avatarURL: 'https://i.pravatar.cc/250?img=61',
      name: 'Sobhan Arian Namazi',
      firstName: 'Sobhan',
      lastName: 'Arian Namazi',
      phoneNumber: '+989127532541',
      position: 'Android Developer',
      organization: 'Sensifai',
      profileID: '135',
      isOnline: false,
      timestamp: 'test',
    }, {
      avatarURL: 'https://i.pravatar.cc/250?img=33',
      name: 'Saeed Saadat',
      firstName: 'Saeed',
      lastName: 'Saadat',
      phoneNumber: '+989128542541',
      position: 'AI Engineer',
      organization: 'Sensifai',
      profileID: '136',
      isOnline: false,
      timestamp: 'test',
    }, {
      avatarURL: 'https://i.pravatar.cc/250?img=18',
      name: 'Yosef Rajaeian',
      firstName: 'Yosef',
      lastName: 'Rajaeian',
      phoneNumber: '+989127526941',
      position: 'Android Developer',
      organization: 'Sensifai',
      profileID: '137',
      isOnline: true,
      timestamp: 'test',
    },
  ];
  return of( response );
};

const getEmployees = ( queryParams?: any ): Observable<any> => {
  return api.get<any>({
    url: 'api/employee/',
    queryParams,
    shouldAuth: true,
  }) as Observable<any>;
};

const getEmployeeByID = ( employeeID: string, queryParams?: any ): Observable<any> => {
  return api.get<any>({
    url: `api/employee/${employeeID}/`,
    queryParams,
    shouldAuth: true,
  }) as Observable<any>;
};

const getEmployeeDefinedFaces = ( employeeId: string, queryParams?: any ): Observable<any> => {
  return api.get<any>({
    url: `api/employee/${employeeId}/defined_face/`,
    queryParams,
    shouldAuth: true,
  }) as Observable<any>;
};

const addNewEmployee = ( formFields: any ): Observable<any> => {
  return api.post<any>({
    url: 'api/employee/',
    body: formFields,
    shouldAuth: true,
  }) as Observable<any>;
};

const removeEmployeeSingleDefinedFace = (faceId: string): Observable<any> => {
  return api.delete<any>({
    url: `api/face/${faceId}`,
    shouldAuth: true,
  } ) as Observable<any>;
};

const updateEmployee = ( employeeId: string, formFields: any ): Observable<any> => {
  return api.patch<any>({
    url: `api/employee/${employeeId}/`,
    body: formFields,
    shouldAuth: true,
  }) as Observable<any>;
};

const addEmployeeFace = ( files: any ): Observable<any> => {
  return api.post<any>({
    url: 'api/face/',
    body: files,
    shouldAuth: true,
  }) as Observable<any>;
};

const addEmployeeFaceByURL = ( images: any ): Observable<any> => {
  return api.post<any>({
    url: 'api/face/create_from_url/',
    body: images,
    shouldAuth: true,
  }) as Observable<any>;
};

export {
  addNewEmployee,
  addEmployeeFace,
  getEmployeeDefinedFaces,
  getEmployees,
  getEmployeeByID,
  updateEmployee,
  addEmployeeFaceByURL,
  removeEmployeeSingleDefinedFace,
};
