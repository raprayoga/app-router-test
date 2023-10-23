"use client";

import React, { useState, useContext } from "react";
import Image from "next/image";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import ToastContext from "@/stores/tost/toast-context";
import { LoginInputForm } from "@/interface/auth";
import { cn, formRules, getVariant } from "@/lib";
import { Input, InputGroup } from "@/components/elements/InputGroup";
import Button from "@/components/elements/Button";
import {
  AtSymbolIcon,
  EyeIcon,
  EyeSlashIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import avatar from "@/assets/images/male-avatar.png";

export function LoginForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const toastCtx = useContext(ToastContext);
  const router = useRouter();
  const [isShowPass, setIsShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputForm>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<LoginInputForm> = async (data) => {
    setIsLoading(true);
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res && res.ok) {
      toastCtx.showToast({
        message: "login Successfully",
        type: "green",
      });

      router.push("/");
    } else {
      toastCtx.showToast({
        message: "Email or Password Not Valid",
        type: "red",
      });
    }
    setIsLoading(false);
  };

  const handleToggleShowPass = () => {
    setIsShowPass((prevState) => {
      return !prevState;
    });
  };

  return (
    <>
      <div {...props} className={cn("text-center", className)}>
        <Image
          src={avatar}
          alt="logo"
          width={200}
          height={200}
          className="mx-auto h-[200px] w-[200px]"
        />

        <div className="flex justify-center">
          <h3 className="my-10 w-4/5 text-3xl font-semibold">Login</h3>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            rules={{ required: formRules.required, pattern: formRules.email }}
            defaultValue="admin@admin.com"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { isDirty, error },
            }) => (
              <>
                <InputGroup className="w-full">
                  <AtSymbolIcon className="absolute left-2 right-auto w-3 stroke-2 text-gray" />
                  <Input
                    type="email"
                    placeholder="input email"
                    className="pl-6"
                    theme={getVariant(isDirty, !!error)}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                  />
                </InputGroup>
                <span className="float-right text-[10px] text-red">
                  {errors.email ? errors.email.message : ""}
                </span>
              </>
            )}
            name="email"
          />

          <Controller
            control={control}
            rules={{ required: formRules.required }}
            defaultValue="password"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { isDirty, error },
            }) => (
              <>
                <InputGroup className="mt-8 w-full">
                  <UserIcon className="absolute left-2 right-auto w-3 stroke-2 text-gray" />
                  <Input
                    name="password"
                    type={isShowPass ? "text" : "password"}
                    placeholder="input password"
                    className="px-6"
                    theme={getVariant(isDirty, !!error)}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                  />
                  <div
                    onClick={handleToggleShowPass}
                    className="absolute left-auto right-2 cursor-pointer"
                  >
                    {!isShowPass && (
                      <EyeIcon className="w-3 stroke-2 text-gray" />
                    )}
                    {isShowPass && (
                      <EyeSlashIcon className="w-3 stroke-2 text-gray" />
                    )}
                  </div>
                </InputGroup>

                <span className="float-right text-[10px] text-red">
                  {errors.password ? errors.password.message : ""}
                </span>
              </>
            )}
            name="password"
          />

          <Button
            type="submit"
            theme="primary"
            className="mt-8 w-full"
            isLoading={isLoading}
          >
            Login
          </Button>
        </form>
      </div>
    </>
  );
}
