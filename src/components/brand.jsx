import Image from "next/image";

function Brand() {
  return (
    <>
      <div className="w-[100%] h-[600px] overflow-hidden hidden xl:flex items-center justify-center">
        <Image src="/BITS2BYTES.svg" alt="BITS2BYTES" width={1500} height={300} className="p-4" loading="lazy" />
      </div>
    </>
  );
}

export default Brand;
