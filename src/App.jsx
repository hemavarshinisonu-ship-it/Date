import { useState } from 'react'

const USER_DATA = {
  "hemavarshini": {
    dob: "2008-06-07",
    projects: [
      { name: "Hema Pani puri", status: "Completed", tech: "Html, Css", liveLink: "https://hemavarshinisonu-ship-it.github.io/Hema-s-panipuri-hub/", githubLink: "https://github.com/hemavarshinisonu-ship-it/Hema-s-panipuri-hub" },
    ]
  }
}

function App() {
  const [name, setName] = useState('')
  const [dob, setDob] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name && dob) {
      setSubmitted(true)
    }
  }

  const calculateAge = (birthDate) => {
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const m = today.getMonth() - birth.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    return age
  }

  const normalizedName = name.trim().toLowerCase()
  const userData = USER_DATA[normalizedName]
  const userProjects = (userData && userData.dob === dob) ? userData.projects : []

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 font-sans">
      {/* Dynamic width to accommodate the horizontal view when submitted */}
      <div className={`transition-all duration-500 min-h-[300px] bg-gray-800 rounded-sm shadow-2xl overflow-hidden border border-gray-700 flex flex-col ${!submitted ? 'w-[500px]' : 'w-[750px]'}`}>
        {!submitted ? (
          <div className="p-8 flex flex-col h-full justify-center">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-white mb-2 uppercase tracking-wider">Welcome</h2>
              <div className="h-1 w-16 bg-blue-500 mx-auto mt-4 mb-4"></div>
              <p className="text-gray-400">Please enter your details to continue</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2 uppercase tracking-wide">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400 transition-colors"
                  placeholder="e.g. Hemavarshini"
                />
              </div>

              <div>
                <label htmlFor="dob" className="block text-sm font-medium text-gray-300 mb-2 uppercase tracking-wide">
                  Date of Birth
                </label>
                <input
                  id="dob"
                  type="date"
                  required
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-none shadow-lg hover:shadow-xl transition-all duration-200 uppercase tracking-widest"
              >
                View Project
              </button>
            </form>
          </div>
        ) : (
          <div className="p-6 animate-fade-in-up flex flex-row h-full flex-1 gap-6">
            {/* Left Sidebar: User Info */}
            <div className="flex flex-col justify-between w-1/3 border-r border-gray-700 pr-6">
              <div className="text-left">
                <div className="w-12 h-12 bg-blue-500/20 flex items-center justify-center mb-4 border border-blue-500/50">
                  <span className="text-xl">👋</span>
                </div>
                <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-2 leading-tight">Hello,<br/>{name}!</h2>
                <div className="h-1 w-10 bg-blue-500 mb-4"></div>
                <p className="text-blue-400 text-sm font-bold mb-2">
                  Age: {calculateAge(dob)}
                </p>
                <p className="text-gray-400 text-xs">
                  Born: {new Date(dob).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => setSubmitted(false)}
                className="text-gray-400 hover:text-blue-400 transition-colors text-xs font-bold uppercase tracking-widest border border-gray-600 hover:border-blue-400 px-3 py-2 mt-8 self-start"
              >
                ← Go back
              </button>
            </div>

            {/* Right Area: Projects Table */}
            {userProjects.length > 0 ? (
              <div className="text-left flex-1 flex flex-col overflow-hidden">
                <h3 className="text-lg font-bold text-white mb-2 border-b border-gray-600 pb-2 uppercase tracking-wide">Completed Projects</h3>
                
                {/* Table View */}
                <div className="overflow-auto border border-gray-600/50 flex-1 custom-scrollbar mt-2">
                  <table className="w-full text-left text-sm text-gray-400 border-collapse">
                    <thead className="bg-gray-700/50 text-xs uppercase text-gray-300 sticky top-0 z-10">
                      <tr>
                        <th className="px-3 py-2 border-b border-gray-600 font-bold tracking-wider">Project</th>
                        <th className="px-3 py-2 border-b border-gray-600 font-bold tracking-wider">Tech</th>
                        <th className="px-3 py-2 border-b border-gray-600 font-bold tracking-wider">Status</th>
                        <th className="px-3 py-2 border-b border-gray-600 font-bold tracking-wider text-center">Links</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-600/30">
                      {userProjects.map((project, index) => (
                        <tr key={index} className="hover:bg-gray-700/30 transition-colors">
                          <td className="px-3 py-3 font-semibold text-white">{project.name}</td>
                          <td className="px-3 py-3 text-xs">{project.tech}</td>
                          <td className="px-3 py-3">
                            <span className="text-[10px] px-2 py-1 bg-green-500/20 text-green-400 border border-green-500/20 uppercase font-semibold whitespace-nowrap">
                              {project.status}
                            </span>
                          </td>
                          <td className="px-3 py-3 text-center">
                            <div className="flex flex-col space-y-2 items-center">
                              <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-xs font-bold uppercase transition-colors hover:underline">Live</a>
                              <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white text-xs font-bold uppercase transition-colors hover:underline">GitHub</a>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center p-4 bg-gray-700/30 rounded-none border border-gray-600/50">
                <p className="text-gray-400 text-sm uppercase tracking-wider font-bold">No specific projects found.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
