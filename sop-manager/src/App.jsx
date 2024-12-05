import './App.css'

function App() {
  

  return (
    <>
      <header className='title'>SOP Managing System</header>
      <section>
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <form className="space-y-4 md:space-y-6">
              <div className="flex items-center justify-between">
                <label htmlFor="user" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User:</label>
                <input type="text" name="user" id="user" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="User ID" required=""/>

                
              </div>
              <div>
                <label >Password:</label>
                <input type="text"  />
                
              </div>
              <button type="submit">Login</button>
            </form>

          </div>
            <p className='read-the-docs'>
              Chief Medical Supplies
            </p>

          
          </section>    
    </>
  )
}

export default App
