import React from 'react'

const Navbar = () => {
    return (
        <>
            <nav className='bg-slate-700 text-white w-full m-0 p-4 font-sans'>
                <div className='flex items-center justify-between'>
                    <div className='flex gap-3 '>
                        <img src="" alt="Todo-List-App" />
                        <h1 className='text-3xl font-bold '>i-Task</h1>
                    </div>
                    <div className=''>
                        <p className='text-lg+'>i-Task  Manage your Todo's at one place</p>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar