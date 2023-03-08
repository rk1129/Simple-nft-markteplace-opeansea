import React, { useRef, useEffect } from 'react';

const BuyNftModal = ({
    setModalVisible,
    item,
}: {
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    item: any;
}) => {
    const wrappedRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.addEventListener('mousedown', (e: MouseEvent) => {
            if (
                wrappedRef.current &&
                !wrappedRef.current.contains(e.target as any)
            )
                setModalVisible(false);
        });
    }, [setModalVisible]);

    return (
        <div className="fixed top-0 left-0 w-full h-[100vh] flex items-center justify-center z-20 backdrop-blur-sm">
            <div
                ref={wrappedRef}
                className="bg-basic-dark max-w-[900px] w-full p-4 rounded-[20px]"
            >
                <p className="text-special-red text-[48px] font-bold leading-[100px] text-center">
                    {item.title}
                </p>
                <div className="flex sm:flex-row flex-col items-center">
                    <div className="p-4 sm:w-7/12 sm:max-w-none max-w-[400px] w-[80%]">
                        <img
                            className="w-full object-cover rounded-[10px]"
                            alt=""
                            src={item.media[0].gateway}
                        />
                    </div>
                    <div className="sm:w-5/12 w-full flex flex-col items-center sm:gap-12">
                        <div>
                            {item.metadata.attributes.map((attr: any) => (
                                <p className=" sm:text-lg text-base text-white sm:leading-[28px] leading-7 text-left">
                                    {attr.trait_type}:
                                    <span className="pl-3">{attr.value}</span>
                                </p>
                            ))}
                            <a
                                href={`https://opensea.io/assets/ethereum/${item.contract.address}/${item.id.tokenId}`}
                                target="_blank"
                                className="mt-16 py-1.5 w-full h-full border-2 border-special-red text-xl font-bold rounded-full text-center flex justify-center items-center bg-special-red hover:bg-white hover:text-special-red text-white"
                            >
                                BUY
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuyNftModal;
