import React, {useState} from 'react';
import Aux from "../../hoc/Auxiliary";
import {Nav, Button} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';


function Sidebar(props) {
    const [active, setActive] = useState('default');

    return (
        <Aux>
            <div className={[props.toggle ? 'active' : '', 'sidebar relative'].join(' ')}>
                <Nav variant="pills" defaultActiveKey={active}
                     onSelect={(selectedKey) => setActive(selectedKey)}>
                    <Nav.Item>
                        <Nav.Link to="/employee" as={NavLink} replace className="flex-vertical-start">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <g opacity="0.9">
                                    <path
                                        d="M19.9999 14.124C19.9999 12.9537 19.6495 11.8236 18.9864 10.856C18.5094 10.16 17.8952 9.58207 17.1834 9.15257C18.0214 8.35898 18.5458 7.23731 18.5458 5.99479C18.5458 3.59554 16.5938 1.64355 14.1946 1.64355C12.7719 1.64355 11.4392 2.34716 10.6297 3.50216C10.424 3.4722 10.2139 3.45604 9.99997 3.45604C9.78606 3.45604 9.57595 3.47226 9.37025 3.50216C8.56071 2.34716 7.22803 1.64355 5.80542 1.64355C3.40617 1.64355 1.45419 3.59554 1.45419 5.99479C1.45419 7.23731 1.97851 8.35898 2.81656 9.15257C2.10474 9.58201 1.49054 10.16 1.01363 10.8559C0.350513 11.8236 0 12.9537 0 14.124V16.5442H4.19461V18.3566H15.8054V16.5442H20V14.124H19.9999ZM14.1946 2.71748C16.0017 2.71748 17.4719 4.18767 17.4719 5.99484C17.4719 7.80201 16.0017 9.2722 14.1946 9.2722C14.1622 9.2722 14.1298 9.27172 14.0974 9.27075C14.0999 9.26388 14.1019 9.25684 14.1043 9.24997C14.1603 9.09136 14.2069 8.92845 14.2444 8.76206C14.247 8.75024 14.25 8.73854 14.2525 8.72667C14.2622 8.68178 14.2708 8.63647 14.2791 8.59104C14.283 8.56956 14.287 8.54814 14.2906 8.52661C14.2974 8.48607 14.3035 8.44537 14.3092 8.40451C14.3131 8.3761 14.3166 8.3477 14.32 8.31924C14.3243 8.28316 14.3284 8.24702 14.3318 8.21067C14.3352 8.17357 14.3378 8.13642 14.3403 8.09921C14.3422 8.06989 14.3446 8.04068 14.3459 8.0112C14.3489 7.948 14.3506 7.8847 14.3508 7.82134C14.3508 7.81667 14.3512 7.81211 14.3512 7.80738C14.3512 7.80486 14.3509 7.80233 14.3509 7.79981C14.3508 7.73511 14.349 7.67078 14.3461 7.60667C14.3452 7.58804 14.3441 7.56946 14.343 7.55089C14.3398 7.49639 14.3357 7.44216 14.3306 7.38819C14.3294 7.37595 14.3284 7.36371 14.3272 7.35152C14.1649 5.78318 13.1741 4.44078 11.7448 3.81987C12.3607 3.12792 13.2516 2.71748 14.1946 2.71748ZM8.86602 4.73218C8.87649 4.72837 8.88706 4.72477 8.89753 4.72101C8.93013 4.70936 8.96299 4.6983 8.99601 4.68761C9.02103 4.67961 9.04621 4.67188 9.07156 4.66447C9.08997 4.65905 9.10844 4.65384 9.12697 4.64869C9.16004 4.63961 9.19328 4.63075 9.22684 4.62264C9.4749 4.5624 9.7336 4.5297 9.99987 4.5297C10.2663 4.52992 10.5252 4.56267 10.7733 4.62291C10.8066 4.63097 10.8396 4.63977 10.8726 4.64879C10.8913 4.654 10.9101 4.65926 10.9288 4.66479C10.9538 4.67215 10.9787 4.67977 11.0035 4.68767C11.0369 4.69846 11.0701 4.70963 11.1031 4.72144C11.1133 4.72504 11.1234 4.72847 11.1335 4.73218C12.2296 5.13751 13.0513 6.11297 13.2373 7.29675C13.2388 7.3062 13.2402 7.31571 13.2416 7.32521C13.2475 7.36532 13.2525 7.40575 13.257 7.44629C13.2586 7.46122 13.2603 7.47609 13.2618 7.49107C13.2653 7.52807 13.2679 7.56533 13.2703 7.6027C13.2713 7.6187 13.2726 7.63465 13.2734 7.6507C13.2756 7.69844 13.2768 7.74644 13.277 7.79471C13.277 7.7989 13.2773 7.80298 13.2773 7.80717C13.2773 7.8091 13.2772 7.81109 13.2772 7.81302C13.2771 7.85973 13.2757 7.90612 13.2736 7.95235C13.273 7.9669 13.2723 7.98146 13.2715 7.99595C13.269 8.04063 13.2656 8.08508 13.2613 8.12922C13.2597 8.1463 13.2574 8.16332 13.2555 8.18034C13.2522 8.2089 13.2486 8.23741 13.2446 8.26576C13.2415 8.28783 13.2383 8.30995 13.2348 8.33191C13.2294 8.36537 13.2234 8.3986 13.2169 8.43173C13.2112 8.46121 13.2049 8.49058 13.1983 8.5199C13.1944 8.53756 13.1903 8.55523 13.1861 8.57278C13.1756 8.61633 13.1641 8.65961 13.1519 8.70272C13.147 8.71985 13.1425 8.73709 13.1373 8.75406C13.1298 8.77875 13.1218 8.80324 13.1138 8.82772C13.1073 8.84732 13.1007 8.86681 13.0939 8.88625C13.0862 8.90832 13.0786 8.93044 13.0704 8.95235C13.0565 8.98956 13.0419 9.02644 13.0267 9.06301C13.0199 9.07933 13.0127 9.09549 13.0057 9.11176C12.9924 9.14221 12.9788 9.17249 12.9646 9.20245C12.963 9.206 12.9613 9.20954 12.9596 9.21308C12.9545 9.22371 12.9495 9.2344 12.9443 9.24503C12.9284 9.27746 12.9118 9.30952 12.8949 9.3413C12.8883 9.35365 12.8819 9.36616 12.8751 9.37846C12.8747 9.37926 12.8743 9.38002 12.8738 9.38077C12.8552 9.4146 12.8359 9.44789 12.8162 9.48096C12.8083 9.49406 12.8006 9.50722 12.7926 9.52016C12.7711 9.555 12.749 9.58948 12.7263 9.62341C12.7122 9.64451 12.6974 9.66518 12.6828 9.68596C12.6704 9.70358 12.6581 9.72124 12.6454 9.73858C12.6289 9.76103 12.6121 9.7832 12.595 9.80527C12.5834 9.82025 12.5717 9.83512 12.5599 9.84994C12.5418 9.8725 12.5236 9.89494 12.5051 9.91701C12.4935 9.9307 12.4816 9.94412 12.4699 9.9576C12.4506 9.97978 12.4313 10.002 12.4114 10.0236C12.3996 10.0365 12.3874 10.0488 12.3753 10.0615C12.343 10.0956 12.3099 10.1289 12.2762 10.1616C12.2562 10.181 12.2363 10.2005 12.2158 10.2193C12.2016 10.2324 12.187 10.245 12.1726 10.2579C12.1491 10.2787 12.1254 10.2994 12.1013 10.3196C12.089 10.3299 12.0767 10.34 12.0643 10.3501C12.0351 10.3738 12.0056 10.3971 11.9756 10.4198C11.9674 10.426 11.9594 10.4323 11.9511 10.4384C11.4056 10.844 10.7304 11.0844 9.99992 11.0844C9.26942 11.0844 8.59406 10.8439 8.04853 10.4383C8.04047 10.4323 8.03258 10.4261 8.02458 10.42C7.99446 10.3972 7.96477 10.3738 7.9355 10.3499C7.92321 10.3399 7.91091 10.3299 7.89878 10.3197C7.87456 10.2994 7.85083 10.2786 7.8272 10.2576C7.81287 10.2449 7.79837 10.2323 7.78425 10.2193C7.76368 10.2004 7.74371 10.1809 7.72363 10.1615C7.68975 10.1287 7.65662 10.0953 7.62419 10.0611C7.61232 10.0486 7.60019 10.0364 7.58853 10.0237C7.56861 10.002 7.54934 9.97972 7.53001 9.95755C7.51825 9.94407 7.50644 9.9307 7.49489 9.91701C7.47626 9.89494 7.45811 9.87249 7.44007 9.85C7.42826 9.83518 7.4165 9.8203 7.4049 9.80527C7.38788 9.78326 7.37108 9.76108 7.35459 9.73864C7.34187 9.72124 7.32946 9.70352 7.31706 9.68586C7.30245 9.66513 7.28774 9.64451 7.27367 9.62346C7.25085 9.58937 7.22868 9.55479 7.20715 9.51983C7.19925 9.507 7.19163 9.49406 7.1839 9.48112C7.16387 9.44756 7.14427 9.41384 7.12543 9.37953C7.1185 9.36692 7.11195 9.35408 7.10513 9.34141C7.08816 9.30952 7.07157 9.27735 7.05562 9.24487C7.04993 9.23332 7.0444 9.22167 7.03887 9.21008C7.03801 9.2083 7.03721 9.20653 7.0364 9.20476C7.02153 9.1734 7.0073 9.14172 6.99339 9.10978C6.98679 9.09458 6.98008 9.07944 6.97374 9.06419C6.95817 9.02682 6.9433 8.98913 6.92907 8.95111C6.92139 8.9306 6.9143 8.90987 6.90705 8.8892C6.89959 8.86799 6.8924 8.84662 6.88536 8.8252C6.87779 8.802 6.87017 8.77881 6.86308 8.7555C6.8525 8.72066 6.84251 8.6856 6.83312 8.65032C6.82651 8.62557 6.82055 8.6006 6.81449 8.57568C6.80976 8.55609 6.8052 8.53649 6.80085 8.51678C6.79548 8.49262 6.79006 8.46851 6.78522 8.44424C6.77776 8.40644 6.77094 8.36843 6.76482 8.3302C6.76149 8.30958 6.75859 8.28891 6.75564 8.26829C6.75129 8.23774 6.74737 8.20702 6.74388 8.1762C6.74216 8.16101 6.74017 8.14581 6.73862 8.13062C6.73416 8.08535 6.73078 8.03977 6.7282 7.99402C6.72745 7.98087 6.72686 7.96771 6.72627 7.95456C6.72407 7.90564 6.72251 7.85656 6.72251 7.80717C6.72251 7.75422 6.72401 7.70166 6.72654 7.64931C6.72723 7.63508 6.72841 7.62096 6.72922 7.60678C6.73158 7.56748 6.73443 7.52828 6.73819 7.4893C6.73948 7.47571 6.74103 7.46218 6.74248 7.44865C6.7471 7.40645 6.75231 7.36446 6.75854 7.32274C6.75972 7.31463 6.7609 7.30647 6.76219 7.29836C6.94759 6.11388 7.76954 5.13778 8.86602 4.73218ZM2.52806 5.99484C2.52806 4.18773 3.99825 2.71748 5.80542 2.71748C6.74844 2.71748 7.63928 3.12797 8.2552 3.81976C6.82539 4.44089 5.83436 5.78393 5.67258 7.35292C5.67145 7.36355 5.67065 7.37423 5.66963 7.38492C5.66426 7.44081 5.66002 7.49692 5.6568 7.55336C5.65583 7.57054 5.65476 7.58767 5.65395 7.6049C5.65089 7.67207 5.6488 7.73946 5.6488 7.80733C5.6488 7.87584 5.65078 7.94419 5.654 8.01249C5.65529 8.03998 5.65755 8.0672 5.65932 8.09453C5.66195 8.13384 5.66463 8.17314 5.66829 8.21234C5.67151 8.24719 5.67548 8.28182 5.67956 8.31645C5.6831 8.34663 5.68686 8.3767 5.69105 8.40676C5.69653 8.44623 5.70243 8.48553 5.70893 8.52467C5.71285 8.54792 5.71715 8.57112 5.72139 8.59432C5.72944 8.63813 5.73766 8.68184 5.747 8.72517C5.75011 8.73945 5.75366 8.75363 5.75688 8.76785C5.79334 8.9291 5.8386 9.08696 5.89251 9.2409C5.89595 9.25083 5.89895 9.26087 5.90244 9.27075C5.87007 9.27172 5.83764 9.2722 5.80531 9.2722C3.99825 9.27215 2.52806 7.80196 2.52806 5.99484ZM5.09489 12.8408C5.08308 12.8595 5.0718 12.8784 5.0602 12.8972C5.03567 12.9368 5.01134 12.9765 4.98782 13.0166C4.97467 13.039 4.962 13.0616 4.94922 13.0841C4.92806 13.1213 4.90718 13.1587 4.88688 13.1963C4.8741 13.22 4.86154 13.2438 4.84908 13.2676C4.82954 13.305 4.81047 13.3426 4.79179 13.3804C4.78003 13.4041 4.76833 13.4278 4.75694 13.4516C4.73793 13.4914 4.71962 13.5315 4.70153 13.5717C4.6917 13.5935 4.68161 13.6152 4.67211 13.6372C4.65117 13.6853 4.63119 13.7338 4.61159 13.7824C4.60585 13.7966 4.59973 13.8107 4.59414 13.8249C4.56928 13.8881 4.5455 13.9518 4.52294 14.0157C4.51779 14.0304 4.51317 14.0452 4.50807 14.0599C4.4911 14.1091 4.47457 14.1586 4.45894 14.2083C4.4518 14.2311 4.4452 14.254 4.43832 14.2769C4.42571 14.319 4.4133 14.3611 4.40165 14.4035C4.39472 14.4288 4.38812 14.4541 4.38152 14.4794C4.37088 14.5201 4.36068 14.5609 4.35102 14.6019C4.34484 14.6278 4.33883 14.6538 4.33308 14.6797C4.32385 14.7213 4.3152 14.7629 4.30688 14.8046C4.30189 14.8297 4.29673 14.8548 4.29206 14.88C4.28363 14.9254 4.27606 14.971 4.2687 15.0167C4.26527 15.0382 4.26146 15.0596 4.25823 15.0811C4.24825 15.1482 4.23917 15.2155 4.23155 15.2831C4.23144 15.2839 4.23139 15.2847 4.23133 15.2855C4.22441 15.3469 4.21845 15.4085 4.21345 15.4703H1.07387V14.124C1.07387 12.2845 2.13132 10.6332 3.78798 9.84828C4.3915 10.1655 5.07755 10.3461 5.80537 10.3461C6.01585 10.3461 6.22697 10.3305 6.43648 10.2997C6.46913 10.3462 6.50231 10.3923 6.53667 10.4375C6.54827 10.4527 6.5603 10.4675 6.57211 10.4826C6.60605 10.5259 6.64046 10.5688 6.67601 10.6109C6.69056 10.6281 6.70549 10.645 6.72031 10.662C6.7536 10.7002 6.78742 10.738 6.822 10.775C6.84015 10.7945 6.85862 10.8136 6.87709 10.8328C6.90872 10.8654 6.94077 10.8975 6.97337 10.9291C6.98561 10.941 6.99715 10.9536 7.0095 10.9653C6.96284 10.9935 6.91661 11.0224 6.87081 11.0519C6.86335 11.0567 6.85604 11.0617 6.84864 11.0665C6.80283 11.0963 6.75752 11.1267 6.71263 11.1577C6.69711 11.1684 6.68165 11.1792 6.66618 11.1901C6.62618 11.2183 6.58661 11.2469 6.54736 11.2761C6.53496 11.2853 6.52239 11.2944 6.5101 11.3037C6.46016 11.3414 6.41082 11.3799 6.36212 11.4192C6.35148 11.4278 6.34107 11.4366 6.33044 11.4453C6.29167 11.4771 6.25328 11.5093 6.21537 11.5421C6.20066 11.5548 6.18605 11.5676 6.17145 11.5804C6.13349 11.6138 6.09601 11.6478 6.05891 11.6822C6.04924 11.6912 6.03936 11.7 6.02975 11.709C5.98422 11.7519 5.93939 11.7955 5.8952 11.8399C5.8837 11.8515 5.87248 11.8632 5.8611 11.8748C5.82727 11.9094 5.79382 11.9443 5.7608 11.9797C5.7477 11.9937 5.7346 12.0078 5.7216 12.022C5.68445 12.0626 5.64783 12.1037 5.6118 12.1455C5.60616 12.152 5.60031 12.1583 5.59467 12.1649C5.5536 12.2129 5.51343 12.2618 5.47381 12.3111C5.46275 12.3248 5.45195 12.3388 5.44105 12.3527C5.41125 12.3906 5.38188 12.4288 5.353 12.4674C5.34183 12.4823 5.33061 12.4972 5.3196 12.5122C5.2818 12.5637 5.24448 12.6157 5.20824 12.6686C5.16931 12.7254 5.13162 12.7829 5.09489 12.8408ZM5.26848 17.2828V16.5443V15.9365C5.26848 15.8769 5.26961 15.8175 5.27181 15.7582C5.27251 15.7388 5.27407 15.7194 5.27503 15.7C5.27697 15.6605 5.27879 15.6209 5.28169 15.5815C5.28346 15.5576 5.28615 15.534 5.28829 15.5101C5.29141 15.4754 5.2942 15.4407 5.29807 15.4062C5.30091 15.381 5.30462 15.3559 5.30784 15.3307C5.31203 15.2979 5.31595 15.2651 5.32078 15.2324C5.3247 15.2064 5.32942 15.1807 5.33372 15.1548C5.33898 15.1233 5.34387 15.0917 5.34977 15.0604C5.35477 15.034 5.36057 15.0078 5.36599 14.9814C5.37222 14.951 5.37818 14.9205 5.385 14.8903C5.39101 14.8637 5.39788 14.8373 5.40433 14.8108C5.41158 14.7813 5.4185 14.7516 5.42629 14.7222C5.43338 14.6955 5.44121 14.6691 5.44873 14.6426C5.45689 14.6138 5.46484 14.5849 5.47354 14.5563C5.48165 14.5297 5.49056 14.5033 5.4991 14.4768C5.50822 14.4487 5.51708 14.4206 5.5267 14.3927C5.53582 14.3663 5.54565 14.3402 5.55521 14.314C5.5653 14.2864 5.57518 14.2587 5.58576 14.2314C5.59585 14.2053 5.60659 14.1796 5.61706 14.1537C5.62807 14.1267 5.63892 14.0995 5.65041 14.0727C5.66152 14.0469 5.67323 14.0214 5.68477 13.9958C5.69664 13.9694 5.7084 13.943 5.72074 13.9169C5.73283 13.8914 5.7455 13.8662 5.75801 13.8409C5.77079 13.8151 5.7834 13.7893 5.79661 13.7638C5.80966 13.7387 5.82325 13.7139 5.83672 13.689C5.85036 13.6638 5.86384 13.6386 5.87791 13.6137C5.89187 13.589 5.90636 13.5647 5.9207 13.5403C5.9352 13.5157 5.94959 13.491 5.96457 13.4666C5.97944 13.4424 5.9948 13.4186 6.0101 13.3946C6.02546 13.3706 6.04071 13.3466 6.05649 13.3229C6.07228 13.2992 6.08849 13.2758 6.10471 13.2524C6.12087 13.229 6.13698 13.2056 6.15352 13.1826C6.17016 13.1594 6.18729 13.1365 6.20442 13.1136C6.22139 13.0908 6.2383 13.0681 6.25564 13.0457C6.27315 13.0231 6.29108 13.0009 6.30901 12.9785C6.32679 12.9564 6.34461 12.9343 6.36276 12.9125C6.38107 12.8906 6.39976 12.869 6.41844 12.8474C6.43707 12.8259 6.45576 12.8043 6.47482 12.7831C6.49388 12.7618 6.51337 12.7409 6.53281 12.7199C6.55225 12.699 6.57168 12.6783 6.5915 12.6578C6.61136 12.6371 6.6316 12.6168 6.6519 12.5966C6.67214 12.5764 6.69249 12.5562 6.71311 12.5363C6.73368 12.5165 6.75456 12.4969 6.77556 12.4774C6.79661 12.4579 6.81776 12.4384 6.83918 12.4192C6.86055 12.4001 6.88214 12.3812 6.90389 12.3625C6.92568 12.3436 6.94765 12.3249 6.96982 12.3064C6.99189 12.2881 7.01417 12.27 7.03662 12.252C7.05922 12.2338 7.08199 12.2159 7.10497 12.1981C7.12768 12.1806 7.15061 12.1633 7.17364 12.1461C7.19705 12.1287 7.22062 12.1114 7.24446 12.0944C7.26777 12.0777 7.29129 12.0613 7.31496 12.0449C7.33923 12.0282 7.36361 12.0118 7.3882 11.9955C7.4121 11.9797 7.43621 11.9641 7.46042 11.9487C7.4855 11.9327 7.51073 11.917 7.53613 11.9015C7.56061 11.8866 7.58526 11.8718 7.61007 11.8573C7.63584 11.8422 7.66183 11.8274 7.68798 11.8127C7.71305 11.7987 7.73829 11.7847 7.76368 11.7711C7.79026 11.7568 7.81705 11.7428 7.84401 11.729C7.86957 11.7158 7.89523 11.7029 7.92111 11.6901C7.94146 11.6801 7.96203 11.6705 7.98259 11.6608C8.58606 11.978 9.27221 12.1585 9.99997 12.1585C10.7278 12.1585 11.4139 11.978 12.0174 11.6608C12.0378 11.6704 12.0582 11.68 12.0784 11.6899C12.1046 11.7028 12.1305 11.7159 12.1564 11.7292C12.183 11.7429 12.2095 11.7567 12.2358 11.7708C12.2615 11.7846 12.287 11.7987 12.3123 11.8129C12.3382 11.8274 12.3638 11.8421 12.3893 11.857C12.4145 11.8717 12.4394 11.8867 12.4642 11.9018C12.4893 11.9172 12.5142 11.9326 12.5389 11.9483C12.5635 11.964 12.5879 11.9798 12.6121 11.9958C12.6364 12.0119 12.6605 12.0282 12.6844 12.0447C12.7083 12.0612 12.7321 12.0778 12.7557 12.0946C12.7793 12.1115 12.8026 12.1285 12.8258 12.1458C12.8491 12.1631 12.8722 12.1806 12.8951 12.1983C12.9179 12.2159 12.9405 12.2337 12.9629 12.2517C12.9855 12.2698 13.0079 12.288 13.0301 12.3065C13.0522 12.3248 13.074 12.3435 13.0957 12.3622C13.1175 12.3811 13.1393 12.4 13.1608 12.4193C13.182 12.4384 13.203 12.4577 13.2239 12.4771C13.2451 12.4967 13.2662 12.5165 13.2869 12.5365C13.3074 12.5562 13.3275 12.5762 13.3476 12.5962C13.368 12.6166 13.3884 12.6371 13.4084 12.6578C13.428 12.6782 13.4474 12.6988 13.4667 12.7196C13.4864 12.7407 13.506 12.7618 13.5252 12.7832C13.5441 12.8043 13.5626 12.8256 13.5811 12.847C13.5999 12.8687 13.6188 12.8905 13.6372 12.9126C13.6553 12.9343 13.6729 12.9562 13.6906 12.9782C13.7087 13.0006 13.7267 13.023 13.7443 13.0458C13.7616 13.0681 13.7784 13.0907 13.7953 13.1133C13.8124 13.1363 13.8296 13.1593 13.8464 13.1826C13.8629 13.2055 13.8789 13.2288 13.895 13.2521C13.9112 13.2756 13.9276 13.2991 13.9434 13.323C13.9591 13.3465 13.9742 13.3704 13.9895 13.3942C14.0049 13.4183 14.0203 13.4424 14.0353 13.4668C14.0501 13.4909 14.0644 13.5153 14.0788 13.5397C14.0933 13.5643 14.1079 13.5889 14.1219 13.6137C14.1359 13.6385 14.1494 13.6636 14.163 13.6887C14.1765 13.7136 14.1901 13.7386 14.2032 13.7637C14.2164 13.7892 14.2289 13.815 14.2417 13.8407C14.2542 13.866 14.267 13.8913 14.279 13.9168C14.2914 13.9429 14.3031 13.9693 14.3149 13.9956C14.3265 14.0213 14.3383 14.0469 14.3494 14.0728C14.3608 14.0994 14.3715 14.1263 14.3825 14.1531C14.3931 14.1792 14.4039 14.2052 14.4141 14.2315C14.4246 14.2587 14.4344 14.2863 14.4445 14.3138C14.4541 14.34 14.4639 14.3662 14.473 14.3926C14.4827 14.4206 14.4916 14.4489 14.5007 14.4771C14.5093 14.5035 14.5181 14.5297 14.5262 14.5563C14.5349 14.5849 14.5428 14.6139 14.5511 14.6427C14.5586 14.6692 14.5664 14.6955 14.5735 14.7222C14.5813 14.7516 14.5882 14.7812 14.5955 14.8108C14.602 14.8373 14.6088 14.8637 14.6148 14.8903C14.6216 14.9205 14.6275 14.951 14.6338 14.9813C14.6392 15.0077 14.645 15.0339 14.65 15.0604C14.6559 15.0915 14.6607 15.1228 14.666 15.154C14.6703 15.1802 14.6751 15.2062 14.6791 15.2325C14.6839 15.2648 14.6878 15.2975 14.6919 15.33C14.6952 15.3554 14.699 15.3807 14.7018 15.4062C14.7057 15.4406 14.7085 15.4754 14.7116 15.5101C14.7137 15.5339 14.7164 15.5576 14.7182 15.5815C14.7212 15.6208 14.7229 15.6605 14.7249 15.7C14.7258 15.7194 14.7274 15.7387 14.7281 15.7582C14.7303 15.8174 14.7314 15.8768 14.7314 15.9364V16.5442V17.2828H5.26848ZM15.7868 15.4703C15.7762 15.3395 15.7611 15.2095 15.7419 15.0804C15.7388 15.0599 15.7352 15.0396 15.7319 15.0192C15.7244 14.9724 15.7166 14.9258 15.708 14.8793C15.7034 14.8548 15.6984 14.8304 15.6935 14.806C15.6851 14.7635 15.6763 14.7211 15.6669 14.6789C15.6612 14.6535 15.6553 14.628 15.6493 14.6027C15.6395 14.5612 15.6292 14.52 15.6184 14.4788C15.6119 14.4538 15.6054 14.4289 15.5986 14.404C15.5868 14.3611 15.5742 14.3185 15.5615 14.2759C15.5547 14.2535 15.5483 14.231 15.5412 14.2086C15.5254 14.1582 15.5086 14.108 15.4914 14.058C15.4866 14.044 15.4822 14.0299 15.4772 14.0159C15.4546 13.9518 15.4308 13.888 15.4058 13.8246C15.4004 13.811 15.3946 13.7976 15.3891 13.784C15.3693 13.7347 15.349 13.6856 15.3278 13.6369C15.3184 13.6152 15.3085 13.5938 15.2988 13.5723C15.2805 13.5317 15.2621 13.4913 15.2428 13.4511C15.2316 13.4276 15.22 13.4043 15.2085 13.3809C15.1896 13.3428 15.1704 13.3048 15.1507 13.2671C15.1383 13.2434 15.1259 13.2199 15.1132 13.1965C15.0928 13.1587 15.0719 13.1212 15.0506 13.0839C15.0378 13.0614 15.0252 13.039 15.0122 13.0167C14.9885 12.9764 14.9641 12.9365 14.9394 12.8966C14.9279 12.8781 14.9168 12.8593 14.9051 12.8409C14.8683 12.783 14.8306 12.7255 14.7916 12.6686C14.7553 12.6157 14.718 12.5637 14.6802 12.5121C14.6692 12.4972 14.6581 12.4824 14.647 12.4676C14.618 12.4288 14.5885 12.3905 14.5586 12.3524C14.5478 12.3388 14.5371 12.3249 14.5261 12.3113C14.4865 12.2618 14.4461 12.2128 14.405 12.1648C14.3996 12.1586 14.3941 12.1525 14.3887 12.1463C14.3524 12.1042 14.3154 12.0628 14.278 12.0219C14.2651 12.0078 14.2522 11.9939 14.2392 11.9799C14.206 11.9443 14.1724 11.9092 14.1383 11.8745C14.1271 11.863 14.1161 11.8515 14.1048 11.8402C14.0605 11.7957 14.0155 11.7519 13.9698 11.7089C13.9604 11.7001 13.9508 11.6915 13.9413 11.6827C13.904 11.648 13.8663 11.6139 13.8282 11.5803C13.8137 11.5676 13.7991 11.5549 13.7845 11.5422C13.7465 11.5094 13.7081 11.4771 13.6692 11.4453C13.6587 11.4367 13.6483 11.4278 13.6377 11.4193C13.589 11.3799 13.5397 11.3415 13.4898 11.3038C13.4773 11.2944 13.4647 11.2853 13.4522 11.276C13.4131 11.247 13.3737 11.2184 13.3339 11.1904C13.3182 11.1794 13.3026 11.1684 13.2869 11.1576C13.2425 11.1269 13.1976 11.0969 13.1523 11.0674C13.1444 11.0623 13.1366 11.0569 13.1287 11.0518C13.0829 11.0225 13.0368 10.9936 12.9902 10.9655C13.0023 10.954 13.0135 10.9419 13.0254 10.9303C13.0587 10.898 13.0914 10.8653 13.1236 10.832C13.1416 10.8134 13.1595 10.7948 13.1771 10.7759C13.2123 10.7383 13.2465 10.7 13.2803 10.6611C13.2947 10.6447 13.3092 10.6283 13.3233 10.6115C13.3593 10.5689 13.3943 10.5254 13.4287 10.4813C13.44 10.4669 13.4516 10.4527 13.4626 10.4382C13.4972 10.3928 13.5305 10.3465 13.5633 10.2998C13.7728 10.3306 13.9839 10.3461 14.1944 10.3461C14.9222 10.3461 15.6083 10.1656 16.2118 9.84833C17.8685 10.6332 18.9259 12.2846 18.9259 14.124V15.4703H15.7868Z"
                                        fill="#193651"/>
                                </g>
                            </svg>
                            <span>İşçilər</span>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link to="/staff" as={NavLink} className="flex-vertical-start">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <g opacity="0.9" clipPath="url(#clip0)">
                                    <path
                                        d="M19.9303 11.1859L17.3023 5.55796C17.2253 5.40039 17.0582 5.30758 16.8837 5.32543H14.6512C14.3943 5.32543 14.1861 5.53366 14.1861 5.79054C14.1861 6.04743 14.3943 6.25566 14.6512 6.25566H16.5814L18.7442 10.9068H16.093C14.891 10.9009 13.7978 11.6024 13.3023 12.6976C12.9435 13.4508 12.1832 13.9305 11.3488 13.9301H8.65116C7.81677 13.9305 7.05657 13.4508 6.69766 12.6976C6.20219 11.6024 5.10899 10.9009 3.90696 10.9068H1.30232L3.86044 6.25566H5.34883C5.60571 6.25566 5.81394 6.04743 5.81394 5.79054C5.81394 5.53366 5.60571 5.32543 5.34883 5.32543H3.58139C3.41331 5.30949 3.25088 5.39073 3.16279 5.53473L0.0930324 11.1627C0.039216 11.2104 0.00587573 11.277 0 11.3487V17.1394C0.0370349 18.4429 1.09164 19.4872 2.39534 19.5115H17.6047C18.9084 19.4872 19.963 18.4429 20 17.1394V11.3487C19.9911 11.2893 19.9671 11.2333 19.9303 11.1859ZM19.0698 17.1394C19.0336 17.9292 18.3949 18.5578 17.6047 18.5813H2.39534C1.60505 18.5578 0.966379 17.9292 0.930235 17.1394V11.8371H3.90696C4.74136 11.8367 5.50155 12.3163 5.86046 13.0696C6.35594 14.1648 7.44913 14.8663 8.65116 14.8604H11.3488C12.5509 14.8663 13.6441 14.1648 14.1395 13.0696C14.4984 12.3163 15.2586 11.8367 16.093 11.8371H19.0698V17.1394Z"
                                        fill="#193651" stroke="white" strokeWidth="0.2"/>
                                    <path
                                        d="M9.67385 11.2557C9.83882 11.4356 10.1184 11.4476 10.2981 11.2826C10.3075 11.274 10.3164 11.265 10.325 11.2557L13.4878 8.06966C13.6419 7.86414 13.6003 7.57262 13.3947 7.41847C13.2294 7.29446 13.002 7.29446 12.8366 7.41847L10.4645 9.79057V0.953398C10.4645 0.696513 10.2563 0.488281 9.99938 0.488281C9.74249 0.488281 9.53426 0.696513 9.53426 0.953398V9.79062L7.16216 7.41852C6.95664 7.26441 6.66513 7.30603 6.51098 7.51155C6.38697 7.67692 6.38697 7.90433 6.51098 8.0697L9.67385 11.2557Z"
                                        fill="#193651" stroke="white" strokeWidth="0.2"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0">
                                        <rect width="20" height="20" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>

                            <span>Ştat cədvəli</span>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link to="/operation" as={NavLink} className="flex-vertical-start">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <g opacity="0.9" clipPath="url(#clip0)">
                                    <path
                                        d="M17.0833 19.9997H7.08333C5.935 19.9997 5 19.0655 5 17.9163V5.41634C5 4.26717 5.935 3.33301 7.08333 3.33301H17.0833C18.2317 3.33301 19.1667 4.26717 19.1667 5.41634V17.9163C19.1667 19.0655 18.2317 19.9997 17.0833 19.9997ZM7.08333 4.16634C6.39417 4.16634 5.83333 4.72717 5.83333 5.41634V17.9163C5.83333 18.6055 6.39417 19.1663 7.08333 19.1663H17.0833C17.7725 19.1663 18.3333 18.6055 18.3333 17.9163V5.41634C18.3333 4.72717 17.7725 4.16634 17.0833 4.16634H7.08333Z"
                                        fill="#193651"/>
                                    <path
                                        d="M3.75065 17.5H2.91732C1.76898 17.5 0.833984 16.5658 0.833984 15.4167V2.08333C0.833984 0.934167 1.76898 0 2.91732 0H12.9173C14.0657 0 15.0007 0.934167 15.0007 2.08333C15.0007 2.31333 14.814 2.5 14.584 2.5C14.354 2.5 14.1673 2.31333 14.1673 2.08333C14.1673 1.39417 13.6065 0.833333 12.9173 0.833333H2.91732C2.22815 0.833333 1.66732 1.39417 1.66732 2.08333V15.4167C1.66732 16.1058 2.22815 16.6667 2.91732 16.6667H3.75065C3.98065 16.6667 4.16732 16.8533 4.16732 17.0833C4.16732 17.3133 3.98065 17.5 3.75065 17.5Z"
                                        fill="#193651"/>
                                    <path
                                        d="M15.4173 14.1663H8.75065C8.52065 14.1663 8.33398 13.9797 8.33398 13.7497C8.33398 13.5197 8.52065 13.333 8.75065 13.333H15.4173C15.6473 13.333 15.834 13.5197 15.834 13.7497C15.834 13.9797 15.6473 14.1663 15.4173 14.1663Z"
                                        fill="#193651"/>
                                    <path
                                        d="M15.4173 17.5003H8.75065C8.52065 17.5003 8.33398 17.3137 8.33398 17.0837C8.33398 16.8537 8.52065 16.667 8.75065 16.667H15.4173C15.6473 16.667 15.834 16.8537 15.834 17.0837C15.834 17.3137 15.6473 17.5003 15.4173 17.5003Z"
                                        fill="#193651"/>
                                    <path
                                        d="M15.4173 10.8333H8.75065C8.52065 10.8333 8.33398 10.6467 8.33398 10.4167C8.33398 10.1867 8.52065 10 8.75065 10H15.4173C15.6473 10 15.834 10.1867 15.834 10.4167C15.834 10.6467 15.6473 10.8333 15.4173 10.8333Z"
                                        fill="#193651"/>
                                    <path
                                        d="M15.4173 7.50033H8.75065C8.52065 7.50033 8.33398 7.31366 8.33398 7.08366C8.33398 6.85366 8.52065 6.66699 8.75065 6.66699H15.4173C15.6473 6.66699 15.834 6.85366 15.834 7.08366C15.834 7.31366 15.6473 7.50033 15.4173 7.50033Z"
                                        fill="#193651"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0">
                                        <rect width="20" height="20" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>
                            <span>Kadr ə.</span>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link to="/salaryEmployee" as={NavLink} className="flex-vertical-start">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <g opacity="0.9">
                                    <path
                                        d="M13.3594 12.8264C12.8855 12.8264 12.5 12.4928 12.5 12.0827C12.5 11.6725 12.8855 11.3388 13.3594 11.3388C13.8332 11.3388 14.2187 11.6725 14.2187 12.0827C14.2187 12.2984 14.3937 12.4733 14.6094 12.4733C14.8251 12.4733 15 12.2984 15 12.0827C15 11.3668 14.4666 10.765 13.75 10.6016V10.3984C13.75 10.1827 13.5751 10.0078 13.3594 10.0078C13.1437 10.0078 12.9687 10.1827 12.9687 10.3984V10.6016C12.2521 10.765 11.7188 11.3668 11.7188 12.0827C11.7188 12.9235 12.4547 13.6077 13.3594 13.6077C13.8332 13.6077 14.2187 13.9414 14.2187 14.3515C14.2187 14.7617 13.8332 15.0953 13.3594 15.0953C12.8855 15.0953 12.5 14.7617 12.5 14.3515C12.5 14.1358 12.3251 13.9609 12.1094 13.9609C11.8937 13.9609 11.7188 14.1358 11.7188 14.3515C11.7188 15.0673 12.2521 15.6692 12.9687 15.8326V16.0013C12.9687 16.217 13.1437 16.3919 13.3594 16.3919C13.5751 16.3919 13.75 16.217 13.75 16.0013V15.8326C14.4666 15.6692 15 15.0673 15 14.3515C15 13.5106 14.264 12.8264 13.3594 12.8264Z"
                                        fill="#193651"/>
                                    <path
                                        d="M17.6351 10.5026C17.1248 9.70747 16.4059 9.07122 15.5561 8.6627C15.3616 8.56919 15.1282 8.65106 15.0348 8.84552C14.9413 9.03997 15.0231 9.27333 15.2176 9.3668C16.6985 10.0787 17.6553 11.5997 17.6553 13.2418C17.6553 13.9445 17.4821 14.6413 17.1545 15.2571C17.0531 15.4475 17.1254 15.6841 17.3158 15.7854C17.3743 15.8165 17.4371 15.8313 17.499 15.8313C17.6387 15.8313 17.7739 15.7561 17.8442 15.6241C18.2317 14.8958 18.4365 14.072 18.4365 13.2418C18.4365 12.2668 18.1594 11.3196 17.6351 10.5026Z"
                                        fill="#193651"/>
                                    <path
                                        d="M13.9716 8.1641L13.9453 8.16406C13.7296 8.16406 13.5547 8.33894 13.5547 8.55469C13.5547 8.77043 13.7296 8.94531 13.9453 8.94531L13.9679 8.94535C13.9686 8.94535 13.9691 8.94535 13.9698 8.94535C14.1847 8.94535 14.3594 8.77168 14.3604 8.55656C14.3614 8.34082 14.1873 8.16512 13.9716 8.1641Z"
                                        fill="#193651"/>
                                    <path
                                        d="M11.5002 17.1168C10.0193 16.4049 9.0625 14.8838 9.0625 13.2418C9.0625 12.5391 9.2357 11.8423 9.56332 11.2265C9.66464 11.0361 9.59242 10.7995 9.40195 10.6982C9.21156 10.5969 8.97492 10.6691 8.87363 10.8596C8.48609 11.5879 8.28125 12.4116 8.28125 13.2418C8.28125 14.2168 8.5584 15.164 9.08273 15.981C9.593 16.7761 10.3119 17.4124 11.1617 17.821C11.2163 17.8472 11.2739 17.8596 11.3307 17.8596C11.4762 17.8596 11.6158 17.778 11.683 17.6381C11.7764 17.4437 11.6946 17.2103 11.5002 17.1168Z"
                                        fill="#193651"/>
                                    <path
                                        d="M12.7744 17.5391L12.7518 17.5391C12.535 17.5387 12.3604 17.7121 12.3594 17.9279C12.3584 18.1436 12.5325 18.3193 12.7482 18.3203L12.7744 18.3204C12.9901 18.3204 13.165 18.1455 13.165 17.9298C13.165 17.7141 12.9901 17.5391 12.7744 17.5391Z"
                                        fill="#193651"/>
                                    <path
                                        d="M15.1331 6.84249C15.0856 6.72921 15.0274 6.62245 14.9596 6.52343H15.9765C16.9673 6.52343 17.7734 5.71733 17.7734 4.72655C17.7734 3.73577 16.9673 2.92968 15.9765 2.92968H12.8484C13.0473 2.64054 13.164 2.29074 13.164 1.91406C13.164 0.92328 12.3579 0.117188 11.3672 0.117188H1.79687C0.806092 0.117188 0 0.92328 0 1.91406C0 2.90484 0.806092 3.71093 1.79687 3.71093H4.92499C4.72612 4.00007 4.60937 4.34987 4.60937 4.72655C4.60937 5.10323 4.72608 5.45304 4.92499 5.74218H3.90624C2.91546 5.74218 2.10937 6.54827 2.10937 7.53905C2.10937 8.10807 2.37554 8.61584 2.78964 8.9453C2.37554 9.27475 2.10937 9.78252 2.10937 10.3515C2.10937 10.9206 2.37554 11.4283 2.78964 11.7578C2.37554 12.0872 2.10937 12.595 2.10937 13.164C2.10937 13.7331 2.37554 14.2408 2.78964 14.5703C2.37554 14.8997 2.10937 15.4075 2.10937 15.9765C2.10937 16.9673 2.91546 17.7734 3.90624 17.7734H8.50975C9.72248 19.0705 11.4477 19.8828 13.3594 19.8828C17.021 19.8828 20 16.9038 20 13.2422C20 10.1947 17.9363 7.62042 15.1331 6.84249ZM15.9765 3.71093C16.5366 3.71093 16.9922 4.16655 16.9922 4.72655C16.9922 5.28655 16.5366 5.74218 15.9765 5.74218H13.4765H6.40624C5.8462 5.74218 5.39061 5.28655 5.39061 4.72655C5.39061 4.16655 5.8462 3.71093 6.40624 3.71093H15.9765ZM1.79687 2.92968C1.23683 2.92968 0.781249 2.47406 0.781249 1.91406C0.781249 1.35406 1.23683 0.898436 1.79687 0.898436H11.3672C11.9272 0.898436 12.3828 1.35406 12.3828 1.91406C12.3828 2.47406 11.9272 2.92968 11.3672 2.92968H1.79687ZM3.90624 6.52343H13.4765C13.6339 6.52343 13.7845 6.55999 13.9197 6.62546C13.7349 6.60995 13.5481 6.60159 13.3594 6.60159C11.5256 6.60159 9.86311 7.34881 8.66022 8.55467H3.90624C3.34624 8.55467 2.89062 8.09905 2.89062 7.53905C2.89062 6.97905 3.34624 6.52343 3.90624 6.52343ZM3.90624 9.33592H7.99276C7.54932 9.94346 7.20647 10.6287 6.98874 11.3672H3.90624C3.3462 11.3672 2.89062 10.9116 2.89062 10.3515C2.89062 9.79154 3.3462 9.33592 3.90624 9.33592ZM3.90624 12.1484H6.80936C6.7501 12.5044 6.71878 12.8697 6.71878 13.2422C6.71878 13.5604 6.74178 13.8733 6.78526 14.1797H3.90624C3.3462 14.1797 2.89062 13.7241 2.89062 13.164C2.89062 12.604 3.3462 12.1484 3.90624 12.1484ZM3.90624 16.9922C3.3462 16.9922 2.89062 16.5366 2.89062 15.9765C2.89062 15.4165 3.3462 14.9609 3.90624 14.9609H6.94475C7.14186 15.6958 7.46206 16.3807 7.88198 16.9922H3.90624ZM13.3594 19.1016C10.1285 19.1016 7.50002 16.4731 7.50002 13.2422C7.50002 10.0113 10.1285 7.38284 13.3594 7.38284C16.5902 7.38284 19.2188 10.0113 19.2188 13.2422C19.2188 16.4731 16.5902 19.1016 13.3594 19.1016Z"
                                        fill="#193651"/>
                                </g>
                            </svg>
                            <span>Əmək haqqı</span>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link to="/setting" as={NavLink} className="flex-vertical-start">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M19.4025 12.1925L17.5642 10.755C17.5884 10.5333 17.6075 10.2742 17.6075 10C17.6075 9.72582 17.5875 9.46668 17.5642 9.245L19.4042 7.80668C19.7459 7.53668 19.84 7.0575 19.6217 6.65836L17.71 3.35086C17.5008 2.97004 17.0317 2.79586 16.6042 2.95336L14.435 3.82418C14.02 3.52418 13.5842 3.27086 13.1333 3.06836L12.8033 0.767539C12.7492 0.33 12.3692 0 11.92 0H8.08668C7.6375 0 7.2575 0.33 7.20418 0.75918L6.87336 3.06836C6.43668 3.26586 6.00754 3.51504 5.57336 3.82504L3.39836 2.95172C2.98254 2.78922 2.50918 2.9609 2.30086 3.34254L0.386684 6.65504C0.160864 7.03672 0.253364 7.53172 0.603364 7.80836L2.44168 9.24504C2.4125 9.52672 2.39836 9.77086 2.39836 10C2.39836 10.2292 2.41254 10.4734 2.44004 10.755L0.600043 12.1942C0.259184 12.4642 0.165825 12.9433 0.383325 13.3425L2.295 16.65C2.5025 17.03 2.97082 17.2033 3.40083 17.0475L5.57 16.1767C5.985 16.4759 6.42168 16.7292 6.87251 16.9325L7.20251 19.2325C7.25668 19.67 7.63668 20 8.08582 20H11.9191C12.3683 20 12.7483 19.67 12.8016 19.2408L13.1325 16.9325C13.5691 16.735 13.9983 16.4858 14.4325 16.1758L16.6075 17.0491C17.0216 17.21 17.4966 17.04 17.705 16.6583L19.6266 13.3341C19.8392 12.9442 19.7458 12.465 19.4025 12.1925ZM18.8983 12.9258L16.9133 16.2741L14.5275 15.3158C14.3925 15.2616 14.2392 15.2825 14.1225 15.3691C13.6058 15.7558 13.1067 16.0466 12.595 16.2558C12.4583 16.3116 12.3608 16.4358 12.34 16.5825L11.9192 19.1667L8.03 19.1225L7.66582 16.5833C7.64415 16.4366 7.5475 16.3125 7.41082 16.2566C6.87832 16.0383 6.36583 15.7408 5.88665 15.3725C5.81247 15.315 5.72247 15.2858 5.63247 15.2858C5.57997 15.2858 5.52747 15.295 5.47664 15.3158L3.02247 16.2416L1.11079 12.9341C1.09329 12.9016 1.09661 12.8641 1.11661 12.8483L3.13911 11.2675C3.25411 11.1775 3.31411 11.0325 3.29579 10.8875C3.25161 10.5383 3.23161 10.2558 3.23161 9.99996C3.23161 9.74414 3.25243 9.46246 3.29579 9.11246C3.31411 8.96664 3.25411 8.82246 3.13911 8.73246L1.10668 7.075L3.09168 3.72668L5.4775 4.685C5.61333 4.74 5.76582 4.71918 5.88332 4.63168C6.39915 4.24418 6.89915 3.95418 7.41082 3.745C7.5475 3.68832 7.64415 3.56418 7.665 3.41832L8.08668 0.83332L11.9767 0.87832L12.34 3.41832C12.3617 3.565 12.4583 3.68914 12.595 3.745C13.1267 3.9625 13.6392 4.26 14.1192 4.62918C14.2367 4.71918 14.3909 4.74086 14.5284 4.685L16.9825 3.75918L18.8942 7.06668C18.9117 7.09918 18.9084 7.13586 18.8884 7.15168L16.8659 8.7325C16.7509 8.8225 16.6909 8.96668 16.7092 9.1125C16.7409 9.36582 16.7734 9.67 16.7734 10C16.7734 10.3308 16.7409 10.6342 16.7092 10.8875C16.6909 11.0325 16.7509 11.1775 16.8659 11.2675L18.8859 12.8475C18.9075 12.865 18.9117 12.9025 18.8983 12.9258Z"
                                    fill="#193651"/>
                                <path
                                    d="M10.0007 5.83301C7.70317 5.83301 5.83398 7.70219 5.83398 9.99969C5.83398 12.2972 7.70317 14.1664 10.0007 14.1664C12.2982 14.1664 14.1673 12.2972 14.1673 9.99969C14.1673 7.70219 12.2982 5.83301 10.0007 5.83301ZM10.0007 13.333C8.16235 13.333 6.66734 11.838 6.66734 9.99969C6.66734 8.16137 8.16235 6.66637 10.0007 6.66637C11.839 6.66637 13.334 8.16137 13.334 9.99969C13.334 11.838 11.839 13.333 10.0007 13.333Z"
                                    fill="#193651"/>
                            </svg>
                            <span>Tənzimləmə</span>
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
                <div className="trapezium" onClick={props.click}>
                    <svg width="19" height="85" viewBox="0 0 19 85" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M15.5957 17.4868L0 0V85L14.7724 71.3854C17.2376 69.1134 18.64 65.9138 18.64 62.5613V25.474C18.64 22.5282 17.5564 19.6853 15.5957 17.4868Z"
                            fill="white"/>
                    </svg>
                    <Button className="btn-transparent">
                        <svg width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M5.40312 7.45675L2.06354 4.22479L5.40313 0.992825L4.375 3.69343e-07L-3.82475e-07 4.22478L4.375 8.44957L5.40312 7.45675Z"
                                fill="#193651"/>
                        </svg>
                    </Button>
                </div>
            </div>
        </Aux>

    );
}

export default Sidebar