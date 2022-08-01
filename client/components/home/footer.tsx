export default function Footer() {
  return (
    <div className="py-6 mt-[100px] border-t-4 bg-orange-400  px-6">
      <div className="md:grid md:grid-cols-2 md:mx-16">
        <div className="mt-1 text-white">
          For any support or aid you can contact to the provided mail within the working days. <br></br>The concerned
          team will it self contact you at its earliest.Happy Learning!!
          <br />
          Regal Building
          <br />
          New Delhi, India
        </div>
        <div className="text-white">
          <div className="grid md:grid-cols-3 grid-cols-2 gap-x-2 gap-y-5 py-4 md:py-1">
            <div></div>
            <div></div>
            <div>
              <h1 className="text-2xl font-semibold text-g2">Contact</h1>
              <div className="flex flex-row">
                <a href="mailto:info@techanalogy.org" className="text-lg pl-1">
                  databuddy19@gmail.com
                </a>
              </div>
              <div className="flex flex-row">
                <a href="tel:+91 84275 58164" className="text-lg pl-1">
                  Mohd Zaid
                </a>
              </div>
              <div className="flex flex-row">
                <a href="tel:+919337837362" className="text-lg pl-1">
                  Amish Dutta
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
