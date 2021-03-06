import profileCss from '@/pages/Profile/styles/index.scss';
import commonCss from '@/styles/_common.scss';
import InputControl from '@/components/InputControl';
import { classNameAnimationSwitcher } from '@/utils/classNameAnimationSwitcher';
import { useEffect } from 'react';
import useMultiLanguage from "@/hooks/useMultiLanguage";

const ProfileGroup = ({
  name, fields, active, updatePageState, userData, dataUpdate,
}:{name:string, fields:{name:string, type:string, placeholder: string}[], active:string, updatePageState:CallableFunction, userData:{[key:string]:any}, dataUpdate:CallableFunction }) => {

  const __translate = useMultiLanguage();
  useEffect(() => {
    classNameAnimationSwitcher(
      `[data-fields-group='${name}']`,
      active,
      updatePageState,
    )(
      {
        showGroupClasses: ['profile-group-hidden', 'profile-group-transition-start', 'profile-group-current'],
        hideGroupClasses: ['profile-group-current', 'profile-group-transition-end', 'profile-group-hidden'],
      },
      {
        error: false,
        loading: false,
      },
      950,
    );
  }, [active]);
  const groupName = name;
  return (
    <section data-fields-group={name} className={profileCss['profile-group-hidden']}>
      <div className={commonCss.container}>
        <div className={profileCss['profile-group__group']}>
          <section className={profileCss['profile-group__title-block']}>
            <h3 className={profileCss['profile-group__title-block_title']}>
              {__translate(name)}
            </h3>
          </section>
          <section className={profileCss['profile-group__profile-collection']}>
            {fields.map(({ name, type, placeholder }) => <InputControl key={name} groupName={groupName} name={name} type={type} placeholder={placeholder} userData={userData} dataUpdate={dataUpdate} />)}
          </section>
        </div>
      </div>

    </section>
  );
};

export default ProfileGroup;
