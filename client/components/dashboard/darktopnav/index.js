import { useToggle } from '../provider/context';

export default function DarkTopNavigation(props) {
  const { toggle } = useToggle();
  return (
    <header className="bg-white h-16 items-center relative shadow w-full z-10 md:h-20">
      <div className="flex flex-center flex-col h-full justify-center mx-auto px-3 relative">
        <div className="flex items-center pl-1 relative w-full sm:ml-0 sm:pr-2 lg:max-w-68">
          <div className="flex left-0 relative w-3/4">
            <div className="flex group h-full items-center relative w-[300px]">
              <h1 className="pl-10 text-2xl font-black text-primary">{props.title}</h1>
            </div>
          </div>
          <div className="flex items-center justify-end ml-5 p-1 relative w-full sm:mr-0 sm:right-auto">
            <a href="" className="block relative">
              <img alt="profile" src="/img/1.jpg" className="h-10 mx-auto object-cover rounded-full w-10" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
