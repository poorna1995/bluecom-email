"use client";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import FileInput from "components/Inputs/FileInput";
import Image from "next/image";
import { useRef, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Toaster, toast } from "sonner";
export default function Home() {
	const inputRef = useRef(null);
	const [selectedFile, setSelectedFile] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleFileSelect = (e) => {
		setSelectedFile(e.target.files[0]);
	};
	const handleUpload = () => {
		const formData = new FormData();
		setLoading(true);
		formData.append("file", selectedFile);
		fetch("https://notification.bluecom.ai/api/marketing/sendMails", {
			method: "POST",
			body: formData,
		})
			.then((res) => res.json())
			.then((data) => {
				setLoading(false);

				if (data.status === "success") {
					toast.success(data.message, {
						action: {
							label: "Close",
							onClick: () => console.log("closed"),
						},
					});
					setSelectedFile(null);

					console.log({ data });
				}
			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
			});
	};
	const isDisabled = !selectedFile || loading;
	const buttonClasses = isDisabled
		? "bg-gray-400 hover:bg-gray-500 mt-4 hover:cursor-not-allowed"
		: "mt-4";
	return (
		<main>
			<div className="grid place-items-center h-[100vh]">
				<div className="min-w-[600px]">
					<h1 className="text-2xl mb-4">Add CSV file</h1>
					<FileInput
						inputRef={inputRef}
						selectedFile={selectedFile}
						handleFileSelect={handleFileSelect}
					/>
					<h1>
						{selectedFile ? selectedFile.name : "No file selected"}
					</h1>
					<PrimaryButton
						className={buttonClasses}
						onClick={() => handleUpload()}
						disabled={!selectedFile || loading}
					>
						{loading ? (
							<ThreeDots
								height="20"
								width="80"
								radius="9"
								color="#4fa94d"
								ariaLabel="three-dots-loading"
								wrapperStyle={{}}
								wrapperClassName=""
								visible={true}
							/>
						) : (
							"Upload"
						)}{" "}
					</PrimaryButton>
				</div>
			</div>
		</main>
	);
}
