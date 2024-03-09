import {useRef, useState } from "react";

// icons
import Icons from "../../Data/Icons";

const Accordin = ({ value, onChangeHandler, clearInput }) => {
  const [showAccordion, setShowAccordion] = useState(false);
  const accordionRef = useRef(null);

  //   function to hide or show accordin
  const toggleAccordionHandler = () => setShowAccordion((prev) => !prev);


  return (
    <div className="py-5">
      {/* accordion */}
      <div className="bg-white rounded-2xl border-2 border-[#d4d5dd66] p-3">
        {/* accordion header */}
        <div
          onClick={toggleAccordionHandler}
          className="flex-center-between cursor-pointer"
        >
          <div className="flex-align-center gap-3">
            <span className="text-xl">{Icons.search}</span>
            <span className="font-bold">جستجو</span>
          </div>

          <span
            className={`transition-ease-300 ${
              showAccordion ? "rotate-0" : "rotate-90"
            }`}
          >
            {Icons.accordionArrow}
          </span>
        </div>

        {/* accordion body */}
        <div
          ref={accordionRef}
          style={{
            maxHeight: showAccordion ? accordionRef.current.scrollHeight : 0,
          }}
          className={`flex flex-col transition-ease-300 ${
            showAccordion
              ? `overflow-visible opacity-100`
              : "overflow-hidden opacity-0"
          } `}
        >
          <input
            type="text"
            className="w-full bg-gray-100 py-3 px-4 text-slate-500 text-sm rounded my-4"
            placeholder="یه چی بنویس"
            value={value}
            onChange={(e) => onChangeHandler(e)}
          />
          <button
            onClick={clearInput}
            type="button"
            className="bg-primary self-end py-2 px-6 text-sm text-white rounded-lg"
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
};

export default Accordin;
