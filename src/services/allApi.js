

import { commonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"

//register
export const registerApi = async (reqBody)=>{
  return await commonApi('POST',`${serverUrl}/register`,reqBody,"")
}
// login
export const loginApi = async (reqBody)=>{
  return await commonApi('POST',`${serverUrl}/login`,reqBody,"")
} 
// addproject
export const addProjectApi = async (reqbody,reqHeader) =>{
  return await commonApi('POST',`${serverUrl}/add-project`,reqbody,reqHeader)
}
// homeproject 
export const getHomeProjectApi = async () =>{
  return await commonApi('GET',`${serverUrl}/home-projects`)
}
// all project
// query parameter baseurl?key=value
export const getAllProjectApi = async (searchKey,reqHeader) =>{
  return await commonApi('GET',`${serverUrl}/all-projects?search=${searchKey}`,"",reqHeader)
}
// api to get user project
export const userProjectApi = async (reqHeader) =>{
  return await commonApi('GET',`${serverUrl}/user-projects`,'',reqHeader)
}
// api to delete project
export const removeUserProjectApi = async (id,reqHeader) =>{
  return await commonApi('DELETE',`${serverUrl}/remove-userproject/${id}`,{},reqHeader)
}
// api to update project
export const updateUserProjectApi = async (id,reqBody,reqHeader) =>{
  return await commonApi('PUT',`${serverUrl}/update-userproject/${id}`,reqBody,reqHeader)
}
// api to update profile
export const updateUserProfileApi = async (reqBody,reqHeader) =>{
  return await commonApi('PUT',`${serverUrl}/update-userprofile`,reqBody,reqHeader)
}