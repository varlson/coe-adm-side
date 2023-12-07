import LognForm from "./LoginForm";

type Props = {
  searchParams?: Record<"callbackUrl" | "error", string>;
};

function page(props: Props) {
  return (
    <div className="flex items-center  justify-center h-screen w-8/12 m-auto">
      <div className="w-full">
        <LognForm callbackUrl={props.searchParams?.callbackUrl} />
      </div>
    </div>
  );
}

export default page;
