import React from "react";

export default function about() {
    return (
      <div>
            <div className="bg-center  bg-[url('../components/bg/bg2.jpg')] bg-gray-700 bg-blend-multiply">
                <div className="px-4 mx-auto max-w-screen-2xl text-center py-24 lg:py-56">
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">Company potential</h1>
                    <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">Here at UR we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
                </div>
            </div>
            <div className="flex flex-col -mt-10">
                <div className="card rounded-lg shadow-md mx-10 bg-white">
                    <div className="container mx-auto">
                        <div className="flex flex-wrap justify-center mx-auto p-10">
                            <div className="grid mb-8 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 md:mb-12 md:grid-cols-2 bg-white dark:bg-gray-800">
                                <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-ss-lg md:border-e dark:bg-gray-800 dark:border-gray-700">
                                    <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Very easy this was to integrate</h3>
                                        <p className="my-4">If you care for your time, I hands down would go with this."</p>
                                    </blockquote>
                                    <figcaption class="flex items-center justify-center ">
                                        <img class="rounded-full w-9 h-9" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png" alt="profile" />
                                        <div class="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
                                            <div>Bonnie Green</div>
                                            <div class="text-sm text-gray-500 dark:text-gray-400 ">Developer at Open AI</div>
                                        </div>
                                    </figcaption>    
                                </figure>
                                <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 md:rounded-se-lg dark:bg-gray-800 dark:border-gray-700">
                                    <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Solid foundation for any project</h3>
                                        <p className="my-4">Designing with Figma components that can be easily translated to the utility classes of Tailwind CSS is a huge timesaver!"</p>
                                    </blockquote>
                                    <figcaption className="flex items-center justify-center ">
                                        <img className="rounded-full w-9 h-9" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png" alt="profile" />
                                        <div className="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
                                            <div>Roberta Casas</div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">Lead designer at Dropbox</div>
                                        </div>
                                    </figcaption>    
                                </figure>
                                <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 md:rounded-es-lg md:border-b-0 md:border-e dark:bg-gray-800 dark:border-gray-700">
                                    <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Mindblowing workflow</h3>
                                        <p className="my-4">Aesthetically, the well designed components are beautiful and will undoubtedly level up your next application."</p>
                                    </blockquote>
                                    <figcaption className="flex items-center justify-center ">
                                        <img className="rounded-full w-9 h-9" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="profile" />
                                        <div className="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
                                            <div>Jese Leos</div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">Software Engineer at Facebook</div>
                                        </div>
                                    </figcaption>    
                                </figure>
                                <figure class="flex flex-col items-center justify-center p-8 text-center bg-white border-gray-200 rounded-b-lg md:rounded-se-lg dark:bg-gray-800 dark:border-gray-700">
                                    <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Efficient Collaborating</h3>
                                        <p className="my-4">You have many examples that can be used to create a fast prototype for your team."</p>
                                    </blockquote>
                                    <figcaption className="flex items-center justify-center ">
                                        <img className="rounded-full w-9 h-9" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png" alt="profile" />
                                        <div className="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
                                            <div>Joseph McFall</div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">CTO at Google</div>
                                        </div>
                                    </figcaption>    
                                </figure>
                            </div>


                            {/* ทำต่อ */}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

