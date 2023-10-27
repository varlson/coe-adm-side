import LognForm from "./LoginForm";

type Props = {
  searchParams?: Record<"callbackUrl" | "error", string>;
};

function page(props: Props) {
  return (
    <div>
      <LognForm callbackUrl={props.searchParams?.callbackUrl} />
    </div>
  );
}

export default page;
