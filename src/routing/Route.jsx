import { createBrowserRouter } from "react-router-dom"
import Layout from "./Layout"
import MyMoves from "../crudfiles/MyMoves"
import MyProfile from "../crudfiles/MyProfile"
import GetQuote from "../crudfiles/GetQuote"
import NotFound from "../crudfiles/NotFound"

export const router = createBrowserRouter([    
      {
        path : "/",
        element: <Layout/> ,
        children : [
          {
             path: "/mymoves",
             element: <MyMoves/>
          },
          {
            path: "/editusers/:id",   
            element: <MyProfile/>
          },
          {
            path: "/datausers", 
             element: <GetQuote/>
            
          } ,
          {
            path: "*",
            element : <NotFound/>
          }
        ]
      }
])  