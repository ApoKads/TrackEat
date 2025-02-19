import React from 'react';

function ScheduleCard({schedule}){
    return <div className='w-full lg:w-[80%] h-80 relative hover:scale-105 hover:cursor-pointer transition duration-300 ease-in-out'>
        <div className='bg-[#E2DFD1] w-full h-full absolute top-2.5 left-2.5 -z-10 rounded-md drop-shadow-sm shadow-inner'>

        </div>
        <div className='bg-[#F8F7F2] w-full h-full rounded-md drop-shadow-sm shadow-md p-4 px-6 relative ' style={{
                        boxShadow: 'inset 1.25px 1.25px 1.25px rgba(0, 0, 0, 0.05)', // Inner shadow
                    }}>
            <h1 className='text-5xl font-pop font-medium text-[#263F54] absolute -top-6'>{schedule.name}</h1>
            <div className='flex w-full h-full '>
                <div className='px-4 flex flex-col w-full sm:w-[80%]'>
                    <h2 className='mt-6 font-pop text-2xl mb-2'>Description</h2>
                    <hr className='border-[#2d3034] border-[1.25px]'/>
                    <p className=" rounded-none p-4 px-0 min-h-32 max-h-56 overflow-x-hidden" style={{
                        // boxShadow: 'inset 3px 3px 3px rgba(0, 0, 0, 0.1)', // Inner shadow
                        // filter: 'drop-shadow(1.5px 1.5px 0px rgba(0, 0, 0, 0.15))' // Drop shadow
                    }}>
                        {schedule.description}
                    </p>
                </div>

                <div className='flex flex-col gap-2 items-center flex-1 h-full  justify-end '>
                    <button className='flex items-center justify-center gap-2 p-2 w-36 rounded-md bg-[#d22929] hover:scale-105 hover:bg-[#B00D0D] active:scale-95 transition duration-300 ease-in-out text-[#f1e8e8]'
                    style={{
                        boxShadow: 'inset 4px 4px 4px rgba(0, 0, 0, 0.1)', // Inner shadow
                        filter: 'drop-shadow(1.5px 1.5px 0px rgba(0, 0, 0, 0.15))' // Drop shadow
                    }}
                    >Delete <i class="fa-solid fa-trash"></i></button>
                    <button className='flex items-center justify-center gap-2 p-2 w-36 rounded-md bg-[#FFFFFF] hover:scale-105 hover:bg-[#EB1763] active:scale-95 transition duration-300 ease-in-out text-[#EB1763] hover:text-[#FFFFFF]'
                    style={{
                        boxShadow: 'inset 4px 4px 4px rgba(0, 0, 0, 0.1)', // Inner shadow
                        filter: 'drop-shadow(1.5px 1.5px 0px rgba(0, 0, 0, 0.15))' // Drop shadow
                    }}
                    >Notify Me <i class="fa-solid fa-trash"></i></button>
                </div>

            </div>
        </div>
    </div>
}
export default ScheduleCard