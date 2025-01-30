import { FiMail } from "react-icons/fi";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineLocationOn } from "react-icons/md";

function Footer() {
    return (
        <div className=" bottom-0 bg-[#5e2f0b] left-0 right-0 mt-48">
            <div className="mx-auto w-full max-w-[1250px] px-4 pt-4 xl:px-0">
                <div className="flex flex-col justify-between sm:px-[18px] md:flex-row md:px-10">
                    <div className="md:w-[316px]">
                        {/* <p className="text-[18px] font-medium text-white">
                            <h1 className="text-white font-extrabold">
                                <span className="text-rose-600">YOUR</span>LOGO
                            </h1>
                        </p> */}
                        <img src="/Asset 2xxxhdpi.png" alt="" />
                        <p className="mt-[18px] text-[15px] font-normal text-white/[80%]">Explore the wonders of Sri Lanka with Ceylon Trip! Immerse yourself in breathtaking landscapes, vibrant culture, and unforgettable adventures. Let us craft the perfect journey tailored to your dreams, ensuring every moment is filled with joy and discovery. Your next great escape starts here.</p>
                        <div className="mt-[18px] flex gap-4">
                            <a className="hover:scale-110" target="_blank"
                                href="#"><img alt="facebook icon" loading="lazy" width="36" height="36" decoding="async" data-nimg="1" src="/Facebook.png" /></a><a
                                    className="hover:scale-110" target="_blank"
                                    href="/"><img alt="linkdin icon" loading="lazy" width="36" height="36" decoding="async" data-nimg="1" src="/linkedin.png" /></a><a
                                        className="hover:scale-110" target="_blank"
                                        href="/"><img alt="instagram icon" loading="lazy" width="36" height="36" decoding="async" data-nimg="1" src="/Instagram_icon.png" /></a><a
                                            className="hover:scale-110" target="_blank"
                                            href=""><img alt="twitter icon" loading="lazy" width="36" height="36" decoding="async" data-nimg="1" src="/TikTok.png" /></a><a
                                                className="hover:scale-110" target="_blank"
                                                href="https://www.youtube.com/"><img alt="youtube icon" loading="lazy" width="36" height="36" decoding="async" data-nimg="1" src="/Wtitter.png" /></a>
                                                <a
                                                className="hover:scale-110" target="_blank"
                                                href="https://www.youtube.com/"><img alt="youtube icon" loading="lazy" width="36" height="36" decoding="async" data-nimg="1" src="/Youtube.png" /></a>
                        </div>
                    </div>
                    <div className="md:w-[316px]">
                        <div className="mt-[23px] flex items-center">
                            <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[75%]">
                            <IoCallOutline className="text-white text-3xl" />
                            </div>
                            <div className="ml-[18px]">
                                <a href="tel:+94768302810" className="font-Inter text-[20px] font-medium text-white">+94 768302810</a>
                                <p className="font-Inter text-[15px] font-medium text-white">Support Number</p>
                            </div>
                        </div>
                        <div className="mt-[23px] flex items-center">
                            <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[75%]">
                            <FiMail className="text-white text-3xl" />
                            </div>
                            <div className="ml-[18px]">
                                <a href="deeptharanaweera26@gmail.com" className="font-Inter text-[20px] font-medium text-[#fff]">deeptharanaweera26@gmail.com</a>
                                <p className="font-Inter text-[15px] font-medium text-[#fff]">Support Email</p>
                            </div>
                        </div>
                        <div className="mt-[23px] flex items-center">
                            <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[75%]">
                            <MdOutlineLocationOn className="text-white text-3xl"  />
                            </div>
                            <div className="ml-[18px]">
                                <a href="" className="font-Inter text-[20px] font-medium text-[#fff]">Rassagala, Balngoda, Sri Lanka</a>
                                <p className="font-Inter text-[15px] font-medium text-white">Address</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex w-full flex-col justify-between text-white sm:flex-row md:mt-0 md:max-w-[341px]">
                        <div className="">
                            <p className="text-deutziawhite font-inter text-[25px] font-medium leading-normal">Pages</p>
                            <ul>
                                <li className="mt-[15px]"><a
                                    className="text-deutziawhite hover:text-deutziawhite/80 font-inter text-[20px] font-normal hover:font-semibold"
                                    href="/">Home</a></li>
                                <li className="mt-[15px]"><a
                                    className="text-deutziawhite hover:text-deutziawhite/80 font-inter text-[20px] font-normal hover:font-semibold"
                                    href="/create-trip">Generate Trip</a></li>
                                <li className="mt-[15px]"><a
                                    className="text-deutziawhite hover:text-deutziawhite/80 font-inter text-[20px] font-normal hover:font-semibold"
                                    href="/my-trips">My Trips</a></li>
                                
                            </ul>
                        </div>
                        {/* <div className="mt-6 flex flex-col gap-4 sm:mt-0">
                            <p className="text-deutziawhite font-inter text-[25px] font-medium">Download the app</p>
                            <div className="flex gap-4 sm:flex-col">
                                <a target="_blank"
                                    href="#"><img alt="facebook icon" loading="lazy" width="168" height="50" decoding="async" data-nimg="1" src="https://www.englishyaari.com/img/google-store.svg" /></a><a
                                        target="_blank"
                                        href="#"><img alt="facebook icon" loading="lazy" width="168" height="50" decoding="async" data-nimg="1" src="https://www.englishyaari.com/img/apple-store.svg" /></a>
                            </div>
                        </div> */}
                    </div>
                </div>
                <hr className="mt-[30px] text-white" />
                <div className="flex items-center justify-center pb-8 pt-[9px] md:py-8">
                    <p className="text-[12px] font-normal text-white md:text-[15px]">
                        © Copyright
                        2025
                        , All Rights Reserved by Deeptha Ranaweera
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Footer