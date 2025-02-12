import Nav from './components/nav'; 
import  "bootstrap/dist/css/bootstrap.min.css"

export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <head>
          <title>Login and User Section</title>
        </head>
        <body className='bg-blue-100'>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <Nav/>
          {children}
        </div>
        </body>       
      </html>
    );
  }
  