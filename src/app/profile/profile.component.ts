import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faSignOutAlt, faUserAlt, faTable, faLock, faArchive, faStar, faImage } from '@fortawesome/free-solid-svg-icons';
import { user } from '../Model/user';
import { ManageImageService } from '../services/manage-image.service';
import { UploadFileService } from '../services/upload-file.service';
import { UserService } from '../services/user.service';
import { UUIDService } from '../services/uuid.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  uploadImageForm: FormGroup;
  editForm: FormGroup;
  resetPasswordForm: FormGroup;
  uuidValue: any;
  active = 1;
  faSignOutAlt = faSignOutAlt;
  faUserAlt = faUserAlt;
  faTable = faTable;
  faLock = faLock;
  faArchive = faArchive;
  faStar = faStar;
  faImage = faImage;
  showLoaderMaster = false;
  userImageBase;
  newProfileImagePath;
  userProfileData: user;
  showUploadImageMessageFail = false;
  showMessage = false;
  firstNameProfile;
  lastNameProfile;
  userTypeProfile;
  phoneNumberProfile;
  dobProfile;
  genderProfile;
  emailProfile;
  userNameProfile;
  dateOfCreateProfile;
  showEditSuccessMessage: boolean = false;
  showPasswordMatchError: boolean = false;
  showResetPasswordMessage: boolean = false;
  showUploadImageMessage: boolean = false;
  profileRating;
  ratingPersonId;
  ratingPerson;
  partnerBalance;
  constructor(
    private route: Router,
    private imageServ: ManageImageService,
    private Uuid: UUIDService,
    private uploadServ: UploadFileService,
    private userServ: UserService
  ) { }

  ngOnInit(): void {
    // this.userImageBase = "default";




    this.uuidValue = this.Uuid.generateUUID();
    console.log("this.uuidvalue");
    console.log(this.uuidValue);


    /* getting image for profile page for first time */


    this.newProfileImagePath = localStorage.getItem("userImage");
    if (this.newProfileImagePath == null || this.newProfileImagePath == '') {
      this.newProfileImagePath = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAADsQAAA7EB9YPtSQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAABz0SURBVHic7Z15cFzVmeh/5/btRbtsS8L7RrxgBwLBhsEwgGx2SKBeIFPJG8hLzUzevECoMG8mC8kkDglDFkgIYV5CEmaSqqm8sIYkBEPAeGEztgAvSMardmHL2qVWL3f53h9t2Vp6uX1vd0vK41flKuv2veec7vPdc77zfd/5juIvDBHRdjazSPOxEpsVlm2fZ1mcbYosEpsSEJ+AD8ES0E8+FgbiQBToBroVdIrQKkiT8mlHbcz9G5YFG5VSMmlfLg+oyW6AV95ukbkWXAZcAKwFzgOKx98ngIhg22DZgmUJti1k2ZuDwD6BXaBes/C9dtVK1eH9W0we004A6uslEC2j1oaPodiAsNJtWSJg24JpCaadEAgXHFCwSYTno7q+9bplKua2PZPBtBAAEdHqWlgvis8quB6oyEc9toBh2hiWIO6EoR+R3+PTHi8f8P15zRpl5LqNuWZKC8DORpmtaXxGFP8AnFnIui1bME3BsGzEjSwojiM8hmX/fP3qYH3OG5gjpqQA7GqWK1DcDtzAaUVtUhABw7KJGy4FIaF+bBJ4YMNK/8u5bZ13ppQA1DXLJQL3oKid7LaMRwDTtImbrnUFgLdB3VO7wveHqbKamBIC8GabXKSEu5Vww2S3xQmGKcQNG9vlkADUIXx9/Vn+F3LZLjdMqgC82SbLlc1DCq6ezHa4YWREiLmfGkB4SYl9V+2q4Lu5bFs2TIoAbBHRS1q4XSnuBUomow25whaIGRam6Xo0MIAfhUr0jesWqEgOm+aIggvAriY5D41fAh8tdN35xLSEaNxyPxoodVhE/mehFcWCCcDrrVKkw3eVcAegFareQiJANGZhWq5HA0GpX4QHfXd9bI0azmHTUlIQAajrkIVi8gQJc+1fPIZH3UBgn7LsTxXCfpD3N3FXq1wnJu/w/0nnA/h1jeKQD01z934pOBuf9uaWA+bf5LhpE8ibAIiItrNF7kH4IzAzX/VMVTSlKAn60H2uB9kSEfnt5gPG/RtF8tZPeZkC6jqkWAyeQHFdPsqfbkTjNoZpu35eCb8jpH+6domK5rBZibJzXWDdEakQP88Cl+S67OmMYdrE4na27udTKNgS8ek3XbdMDeSyXTkVgNdbZaZfeA64MJfl/qVgWkIkbuFaCuAtQ9evu/pDqjNXbcqZALzeKvP8wovAWbkq0ymGYfDe0aO8f/w4AwNDDISHEPdm2lOEh8O0NjcC4NN15pwxmxuuuoYzFy9yXaZpCZGY5fp5gUOamFfVnlXU5LqQUeREAHa0yXyfzXZgSS7Kc0prx/u8sG07DYcOEYvHc16+ZRhEh3rGXVV8ePWH+ad//Dya5k43MywhFrM8DATqiLJ8l9SuVsdcFzFSktcCdhyScj3IdoGPeC3LKYNDQzy16Xne2rvPi0MmI8kFIMGyD63ga3f9k+uyveoEwF4V1C+rXaL63BfhcRlYVyd+X5AnC9n57e8f4/s/e4Rde/bmtfMzcejwAV6v2+X6eb+uEQh4+vnPkZj55OP1EvBSiOsWiIiya/gVcKWXBmTD0ZYWHvjFL+np6y9UlWl59oXnPT0f0DX8uich2DDLZz72uIjPbQGua69r4z4Fn3b7fLb09PXz89/8Ni9zvVu6urs8lxEMaPhcWgwBFNxUdcD8N7fPuxKAXc1yM8KX3VaaLSLCo799jMGhoUJV6QgjHsO03Rt4IKGEFQV9KG/a2L+8/J55o5sHsxaAne2yAMUjbipzy1v73qWpra2QVTpCRPj5r//TczlKQXHQ9SgOoEAe3XZYFrh40DlbRPTSNrYhrMu2IrfYInzrhw/S1dtbqCpPkW4VMBp/IEBJcQmVlZVcfsmlXH6Ru5/HMG2icQ8jivBmeVj/62zC0bMaAUpb2VjIzgdobG2dlM7PBiMep6+vl6amRn71X7/mXzZ+k8GhwazL0XUNn3vnESgu7C81v53NI44FoK5NaoGvZt0oj+xp2F/oKj1z4sQx/vW+e7PWDxQQCmie9AEFX3p5v3GZ0/sdCUB9vQTE5mdO788lR5qbC11lTujr6+W3Tz+V9XOaUgT8nn5mBfyfujrxO6rPyU2RMr4ELPfSKrf0D2Q/lE4Vdux609VzAV1D97A0RLFqoNT8opNbMwpAXYcslEkY+iGhAA4MTq2lXzaEw2HXzwa9WQkBNm5ukIxeq4y1iMUDJNluXQhsy8Ky3XvOJhsRm2jc3WZhTVNerYTFaOb9GetJ9+HOZtmAcLOXVnyAe4J+zwrhzS8fMDakuyftxkul+J776gvL/JklXHvOAqrLijgxGOGtpi72tHRjud/HB0BQ9/HJC1ewfuV8qkpCnBiK8tMte9jVeDxHLU+NUgl9IGZ4sg3cA2xO9XFKAahrkasEzndfc+H42HmL+PL15+L3nR7Q/v4yGIoZvN3Uxf72XvZ39NHcM0RnfyTl8szv06gpC7GoqoyVcypZu3Am580qQo3yOi6pLOaCW9fz1L4mvvm7N/L+3QK6Rtz0sP0M1m0+aFy6Ybl/e7IPUwqAKL7kxVldKM6aO4O7bzgvaQh2adDPpSvmcOmKOaeu2SJ0D0WJW8JgJOFYKisKEPApZpWG0EaPuaYJA8mUUOETZy/izSPHeW7v0Vx/pbGohOs47mEUUDZ3A0kFIKkOsLNF1iKknTumCrdcsDSr+HtNKarLiphXWczKOZWsnFPJvMpiqsuKxna+Az5f++Fsm+sKj8ogwNUvHYivTfZB0pIVfMVrjYViSXXZpNVdUxoqSD2aAr/uzV2oRN2dtOzxF3a0yjLgJk+1FZCAz5MXzRPZjhheCHgcBRTcuPlQdEKanQmlasJtya5/wOSiacrLLiMApWzf300od/QfIqIKGeWTC0pDjkzeecHvxVzrAt2rLiB8dryPYEyJdS2sA5Z6q6VwLKoqY3ZF0aTV7wMuWT6vYPV5HAEAZg+WmmOU+7EjgOK/e62hUPg0xf++5uzJbgY/uPlidF9hZkyFdyGwlRqz4/hUy+vqxK/gFk+lFwClFKvnzeTh2y7mwjPPmOzmUKZrbP/SJ7jxo4VJY+h1GlAiN40OJT8lTrta5VoS+/qmDLZpcNbw22OuBf26Z43YMSkNQSlQTLDYvTHjQgKBHPrSBAYjpqcilMaVtcv9L8FoS6DNtVMjadxohLIiT/seCosUIOWKSkwDHtLQIBbXAi/BaB1ATb1Ubb5JXOPnilAgmPMyvewjOMk1I//R4GSo9yRF/KRDFdDQMp3wFDgKoFi1vUHmwEkBUBYXe2/WBxQKt7mHRmMqax2cFABRXOS5xA8oGAq8xQwCIBfDiA4gUzODl0w9rdQF+fkOmvdp4AIA7aT5tzB+zSwRFHE1eaZer4jmw86TW8XnXT/6sIgo7a1WlgKlOWhTXujUqie7Ca7pL85f210mJxlNxcv7WajbwqqprGwf087AFo0q6aZIoqhpEKZk6zp9oRqOlqzIWx05WSH5rFU608D50+mrppNqQhJjtbl/CguBYn/V+YR9+Q9SUSrxz1OSFLEXa0rhPuVVgYmqIFGVe8NKrrB1vSCdP4LXgBSFWqIhLMxRewpCXE1d07ClCnu8kfK+FFykoZhWWlZEFSYOD4As7e0xf2E3UHnVAxWqWlNQlZPWFIhwIQ8YkexCsQf9lXlqSAo8DgACszSZZpm8B7SywhmIstnfr6AzMDt/bUlWpfefYZbGJG38dIuFjwGtQIqW6XxjquEvwtAKq5/k4DUo1oCpq1Wl4IRWiFlLwHIuAJ1F8/PYllR4FoHgtBSAPlWRf2XQMB0vsm2fn/dDhQsOHSEHU0BQw0vy8kmkXZub3wpizhNSHitdxBQ5gzNrNGDqpN7Mgj6tgl4tT1q3bUPcWdxdPFBCRyjr9Hy5wfurG5u2AgDQ4puPQR68hZEoTn5d8WkcrJg8R2oOhu6YBhTkfLp8YODniL4kt8tCy3I2/CtFc/lZRLXJXER5FoFhDejOQUsmjSFVwmHf0twJQdjZ6a0d5UvpCtTkpk6X5CBbfpcGeE95Pcn0a+Uc1pdiK4/G0eFIYi9AOpSivWIZHaHJd6HkYAro1lDTXwAA+lU57/mWE8Xl8jAWg2j6jF6i6xyecQ7vhyZjzT8R8Zj/CKRLE2F6puJMwrAqosG/ghhZuoxjRuLtT4nCCpWwZ+ZF9PmnjuXca/crVIuuFE3T0xKQHBuNiAoRFIf5+SIxiKTp/EAAikIM6jMwC+zuzYTXAUCUNOrKojF/B5NOYWyB4WGIJ8msrusQ8Cf+5SD4Lh8IeD4zSdAadQsapuZXzDPxeKJzQ8GETVXTwOcDn5YTG2u+ERHvc4Dla9AuWEQTkNPjSKcFoSAUFyX+FYUgGADdNy06H7LzVKegf/1ZtGhKKUHxbg7a9AEFxGsGVGCfUiox+ytwfwDeB0wKloft4QAIO2EkrMzmNc8t+oCCYnseAdRrcFIAbJtXPLdoCtDT189zm/9MtKgi53N5pKicJ5/9PSe6Mx8ilW9sW7zqf2KbvtMCcMESdQzhgPemTQ49fX08+exz3PPgj1FWhLKqWcRm5s5UG58xn/KqKkK68O2HfsKvn3yKE92T50Lxkh0EAEXDFWer4zA6RYxiE5C/vUx5oLOrmxe2bWPn3r3YVkItvvnqRKoDs2QmyowT6H/fUx1mySyMskTk/M1XrWPTq2+zc/ce6vbt44JzzuGayy+jetYsb18kS7wqgErYNPL/UwKgYJOAo3NmJpsTPT28uP1V3njn7VMdDzCvZhYLZ5+OFzQqZqMsA/+QO3eHFSonNvN0sMeSeTXMnlXJse4+bMtmxzu72bl7D+euXsX1G9Yzu7owWyy8jgCiOHXo8SkBqIixrS9IP1DhqfQ88n5nJ3/e/gq79u5DkiyEz1u5ZMK1+Mz5aLaBbzi7A6dtf4hY1eIJusR5Zy1l06unM5fZIrz9bj276xtYtXw5N2xYz4K5c8gXpul5+dfbZeqndL5TArBsmYrtbJFnFHzGaw25pu39Y/zhpc00HDyYsICl4JwVi5NcVURnLabIOowWc3aIk/h0YtVLEW1ikqpzli8eIwAj2CK8e+AA9QcOsmrFcj5+xQbmz8n9PgHT8moBUk9/crU6FfEyxruhFI8hU0cAegfDPPHcJva8u89R9MPsqhQxgkojWrWU0PGDaGYGJ5HSiFYvxdaTexTnVKePQxSE+gMHqD94kNVnreamq69k7qwZGdvuBBEwPc7/ti2Pjf57rAAc5yWp4RhQ2C0uo+jsG6C+sZX6o22c6Ounq6necehL9YzUs5f4dGI1ZxI6fhBlpQ76iM1ciB1Ivf2saka5o7YgQv3+eo5HoLKslJUL57JqyXwW1sxyvbffssRrFFCH77i+ZfSFMQKwZo0y6lrkPwt5TqCI0NLZTUNjGw3NbQyMDslSCk33YxuZY/Q0paiqTL9jyNaDRKvPpOj4oaT7/uKVczBL0r+tVZUOBQDw6QFQir6hMDsaDrGj4RAloSAfmjeb1Uvn86F5s/Fl4W00TM9H1f9Hba0aI/0THNyWzS80jS+TxzMDTMviSMdxDrS8z4HmdobSROIUV9Qw1JX56HilKXwOkjbbgWKiVUsIdR0dM7KYJTMwyjMPfLruPHllceXEVUE4GmPPkWb2HGmmKBBg6dwali+cy6pF8wj4U8cb2CJeh3+xfdavxl+cUOOFi1XjrlbZhHC9l9rGY1oWDY1t1De3c6T9GIbDfXehskoiAyewMhzAmE14lFWUWN4Fu1sSfwdLic10mCfD4Rjs8wcJlqbXFyLxOPVNbdQ3tfGs7uPMebNZvWgeKxfPI6CP7RrDo/Yvij9tWBY6Mv56UpFTigckRwIQicXZtns/uw81EYm72IKgFMWVNQx2tqa9LdvgCLNkFpoZRw/3Eqta4th07LSa4hk1WZmjDdPiveZ23mtuJ/iGn/NXLOGvz1lJcSiICMQ9Dv8C3092PemYuWa+2gK85alGYPfhZh566nneqD/orvNPEiitRHeQczeaLLon3f0Roa++FfE5D/WKOajDFwgRyPD2p63DMHj93YP8+MlN7D3cnJj7PeUC4s0rVviT+nvSTZrfdl2fCC/u2sfvtu9kOEOkrRMUUJRkPh1PTxap3a33Guj5/kP0PvUc4UcfRRyeUdzdn/k08+KK6pzsUojGDZ7ctoN/f+IZLC8RID6Vsi9TCsDaher3QNbnn4vAM6/U8eq+97J9NC16MHNmkPe7nFn7hl7dQffDv8Q6GQk8tGsv3T/5OfZwNOOzHQ7q8BflLouJGYvQcayDZ15+2d0SULFj/XL9T6k+Tq82C/+abX2v7N3P7sNN2T6WEbEyD711B9rS/0i2Td/TfyT8X/8XGaeEWvvfo/uBH2P29KZug0DdwcwrEsvMbipKWZ9tY8YSO/fqDx/m1XcmWiAd8PV0H6YVgLWL1IsoUkrPeI719LPlnXqntztHhOG+zA6dI63HCKcYySUWo+tnjxL780spn7fbO+j57g+JNrVMfB4IW3C0rTNjOyL9nTnZt2XEwsgoe8W2XXV0dGaufxS/X7/Cn/LgaHCw1tcSHsKME7kI/OG1uhxEqkwsONxzjPhw5rjVjuNdmAKRcUJgDg7R9d0fYu3NHPooAwMM/OhhYqPmegGGLTAFOo5l7oB4eJCh7nZPQmBbJmZ87L5dW2w2vfaq02JjyrL+OdNNGQXg/AXqMIoHM93XeKyT9hO5j5YJ9xwj0u/MndvTm5ifYzYMmRC1YNiEcLAEZjr32WvrLiJSXMagmXjrB0wYObu5b8BZAHV0oJdwr8sj5gXikcGkmn/78U4a2zNPQwL3164OHc50nyNrnwHfUnAo3T11+yfYGDxjxqOOOx8gFh0mEk0sN02BqA1xAVEK/2duRVVnzi2kFi5E//jHgUSaQMM+/SIPDkeJRTMriiNE+rqw4s7vH8EyIthm6mXz2w37MxVxUAvq33FSlyMBWLdARUTxOVKsRm1bONzuUtrTMKIAOUVEeH1Pisi2oiL8f/93ifj/VBQV4f/s/0jsD0jCa2/vz3JYF4yos+3mp56wbWKR9MvZw60tWKkTWIlo/EPtEuVI8hzb+9cuUFsVPJDss2M9fcSM3Gi+o9H07LN/1O1LPeqpuXPx3/q3KS10/k9/ClWVeqp4uz77Uc6Xxr4/HgFikf6MCSrjhsHxFMGpAt/fsNy/3Wmd2e127ORuzmAdwrrRl7v68rOxKBAqRdN17Ex79kdxtKU97efamWfin5/8wEntzPSJ0xtbs4sv1HQ//pDzoxjM2LAjzyfAib4e5taMM44pdlQM6lkt3bPy+K1ZowxL8TeMSyox7MHMmxalCJVltx27u7snraNJmptSP9ySeqd8NBanpyc7JTdUNsOxP8C2DIxIZivjCMMTdZETStNvWbNGZTUUZ+3y/av5qg3FbcCpcSpbG3w2hMpnoZKEZqXCtky27WpIfUOaTpbW1J9tfvNdx+ZiAKX5KCp3ltBSbJtYOLuYRcMYMyraCm6rXaYyLw/G4crnv3aB2iTqtHdJ5TG/gObTHfkBRrP9rTTr/TQCQPNEA9AIr7+TUfMeQ3FlNcrJwZcC8Uh/VsI18tyo/95Xu9L/fOqbU+M66GPtfL6m4HG3z2dDcUWVI2/gCEcbU7wIAwNIf+o3Tfr7Un7e2Oz85dKDIYoqnL39RnQQy+G8nxx57JUV+jfcPu1aAJRSdtEgtwq84LaMLCqjtGq+Yw/bcHiI/Uc7JlxPO/+PkGSE2H+0neiwsyWpAkpmzXM09xvRMEaWS91xvBz1+T+zUSnXrkJPYV+rV6t4vIhbYnFj4q+dY/RQMcFyp9Y84U9bd068nG74H6F14jTwxy07ceqQD1bMwh/KnDvQjEcxolmcTD6OmGG0K0u/8bplypO/3XPc3yXVajBsWNfOKC3Je8bR0pmz8TmcCvbsn2i4lCSdO+Ge5olCsqf+oKM6ff4AJTOSLzFHY8ajjnwbqagsKzNMw7yhdrVyL0EnyUng5799+vy9F35k+V9VlBbnd+usplFWswjlIB9geHCQ90brAr294MSOPzgAfaddwvsOtxIZdrChRKlE2zKsWE53vjvNuay4pO+jS1dd/IPP1e52VcA4chb5e+eVy96JxuPLyUEoWTr0QJCSWc4yhT/z0qh4ljRLvAm0nB4pnnnxDUePlFbNQw+mz1FoGVHikX48xHft7hscWv6Nz16Qs4QeOQ39/t3d/607HmID8Houyx1PqHwGIQcxd3tHTQPJhvZU2KN0hYaDRzO3p6wyYfRJgxEbTqz1Xfa9wE4z5lv/yk/uPOGuhOTkPPb/pa98sn8YrgaeznXZoympmoceLEp7T3R4mJ37EvZ7J/P/KU4Kyxu7DxKLpNfS9WBxQutPhSSWetlY+SYWIY+XDwdqX/3p51OHK7nEuYktC5q2PhE/tPXxJ5bV7o8Bl5MHQVNKESgpJx7uT7pTeIQT/cNsWD4f3nQ2lANgxGHlKh5++mV60oSIaf4AFbOXoKUw+IjYxIf7MV24hAEEbFBf2/bgHV88+NaavJhb85giUMlz37zlPg11BZBVHJNTNJ9O+ezFaRWvw0eOEjmSvRcvcvgwRxpTTxtK81FxxiI0Pbk/TSyT6FAvluF6lTak4BPbHrzjvnzaWvOeI/LZjbdsVfguAnKitY7HFwhRVjM/peHFsiy2vJK9XvriK3XYqTaRKkVZzQJ8geRKn2VEiQz1IGk2oaZFqbfwsXbrg194xl0BzilIktA/bfzE0WHCF4F8izycUBIoLqeseh6pzu15pTX7AeiV1lSRSIrSqrkEiiduRE0M+QMnlT1XL62Jku9VV3St2/rAF3IbV5+CgqfFvPaeJ89Ttv0fwLm5LjvS10m4J3lk0g/mh1gScPZ1m2I2/9yefOgumTk7qXPKMuPEhweyd+qcZj+K27b+6At1bgtwQ8HTBG/6xs3vDFO9FsUXyfFxNUWVNSk9h5sHnQ/Hzw8k78Si8lkTyhfbIh7uJzbU67bzIyj1HSpLP1rozodJPuvsmm8/vkKz+C5wY87aIsJQVxvRwb4xl4s0xc8WhijJIPJDNvxjS5TouPD2UPkMSkc7eQTM+DBGdGzsfjYtVYonLYMvb3/4C41uCsgFUyIz8jUbnzxHw/46cEtOChRh8EQbsaGxQvC3M3VuqkwfZ/hEr8FjvWNHi2BJBWU1C052vmDGYxjRIS/D/RtK1F1bfnxH1lvvcs2UEIARrtv42KUKda/AJZ4LSyIEM3yKny4Moaf41oYI/6slRt+oNGyBknLKaxYCCsuIEI+G3Xe8qC1KuH/LQ7dvym8YjXOmlACMcM23ntigRO5UcANe9BQRBjpbiIdPO4Furw5QW5bcbvDigMUjXacXKcGSCkqr52GZcYzYsKtlnYCtFM+h5N6tP7xzR/ZfIr9MSQEY4fqNTy21sT8HcqsCd2fFijDY2Xoq5m6eX/Hg/OCERE0iwhfb47THE/N5sLiMYMVMrHjM3RyvaET4DZi/3PrgXU2u2l4AprQAjHDL44/7wg1cCfIpUB8Dssu7JkL4RBuRk9PBV2cHOL947CjwZtjiB8cTb38wWISvpBQXP88JFI+JqN9se/D2HVNlmE/HtBCA0Zz/yCP+M47NuBzhegVXCKx29KAI0e4OhgZ6WBrU+N7cAAqQuIEdjfHVXo2jtkZ5MIhRUuH0hzER6pRiC7baLDO7tm3duNGl+W9ymHYCMJ6r731qjmZalyrhAgUXAOcKJN2NIbaJ2d1B/2A/XymK8xE7Crbwlujcb5ZQFQoyXFxOqp9FEj6Nd0F2K9G2FNn29k0/uXNaH7cz7QVgIqKu+87TC5VlrhRhhWWa59pG7GzbMhfbtlmmFL4Z4R5djwxzrz6EAr5ultEXKI5FSsqPkTg/6Tio40qkU5ADotGgx7WGzf9+x7Q+ZjcZ/w/7ToVj4kgx1AAAAABJRU5ErkJggg==";
    }
    else {
      this.getUserImage();
    }

    //   const userProfileData = {
    //     profileId:localStorage.getItem("userId"),
    //     email:localStorage.getItem("email")
    //   }
    // this.imageServ.retrieveImageFromServer(userProfileData,
    //   localStorage.getItem("sessionUserType"),
    //   this.uuidValue,
    //   localStorage.getItem("auth")

    //   ).subscribe(
    //     (userImageResponse:any)=>{
    //       console.log("user profile image exist");
    //       console.log(userImageResponse);
    //       this.userImageBase = userImageResponse.data.body.data.image;
    //       localStorage.setItem("userImage",this.userImageBase);
    //       if(this.userImageBase==null){
    //         this.userImageBase = "default";
    //       }
    //       localStorage.setItem("userImage",this.userImageBase);


    //     },
    //     err=>{
    //       console.log("user profile image is not found"); 
    //       console.log(err);
    //       this.userImageBase = "default";
    //       localStorage.setItem("userImage",this.userImageBase);

    //     }
    //   )


    //     if(localStorage.getItem("userImage")){
    //       this.userImageBase = localStorage.getItem("userImage");
    //       if(this.userImageBase==null){
    //         this.userImageBase = "default";
    //       }
    //     }
    //     else{
    //       this.userImageBase = "default";
    //     }



    this.uploadImageForm = new FormGroup({
      image: new FormControl(null, Validators.required),
      profileId: new FormControl(localStorage.getItem("userId")),
      email: new FormControl(localStorage.getItem("email"))

    });

    // reset passwrd form
    this.resetPasswordForm = new FormGroup({
      email: new FormControl(localStorage.getItem("email")),
      newPassword: new FormControl(null),
      reNewPassword: new FormControl(null)
    })

    // this.retrieveImage();


    // retrieve profile data 
    this.userServ.getOneProfileData(localStorage.getItem("userId"), localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (userProfileResponse: any) => {
        console.log("all user profile object is --------------------------");
        console.log(userProfileResponse.data);
        // localStorage.setItem("sessionFirstName", userProfileResponse.data.firstName);
        //     localStorage.setItem("sessionLastName", userProfileResponse.data.lastName);
        this.userProfileData = userProfileResponse.data;
        this.firstNameProfile = userProfileResponse.data.firstName;
        this.lastNameProfile = userProfileResponse.data.lastName;
        this.userTypeProfile = userProfileResponse.data.customerType;
        this.phoneNumberProfile = userProfileResponse.data.mobileNumber;
        this.dobProfile = userProfileResponse.data.dob;
        this.genderProfile = userProfileResponse.data.gender;
        this.emailProfile = userProfileResponse.data.email;
        this.userNameProfile = userProfileResponse.data.userName;
        this.dateOfCreateProfile = userProfileResponse.data.createdAt;
        this.editForm.get("firstName").setValue(this.userProfileData.firstName);
        this.editForm.get("lastName").setValue(this.userProfileData.lastName);
        this.editForm.get("country").setValue(this.userProfileData.country);
        this.editForm.get("email").setValue(this.userProfileData.email);
        this.editForm.get("mobileNumber").setValue(this.userProfileData.mobileNumber);
        this.editForm.get("customerType").setValue(this.userProfileData.customerType);
        this.editForm.get("dob").setValue(this.userProfileData.dob);
        this.editForm.get("gender").setValue(this.userProfileData.gender);



      }
    )
    this.editForm = new FormGroup({
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      country: new FormControl(null),
      email: new FormControl(null),
      mobileNumber: new FormControl(null),
      customerType: new FormControl(null),
      dob: new FormControl(null),
      gender: new FormControl(null)


    })


    // get profile ratings
    //localStorage.getItem("sessionUserType"),this.uuidValue,localStorage.getItem("auth")
    this.userServ.getRating(localStorage.getItem("userId"), localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        console.log("rating object ==== ");
        console.log(response.data);
        this.profileRating = response.data;
        for (const oneRate of this.profileRating) {
          this.ratingPersonId = oneRate.profileId;
          console.log(this.ratingPersonId);
          this.getRaterProfile(this.ratingPersonId);




        }
        // this.ratingPersonId = response.data.rate;
        // console.log(this.ratingPersonId)
        // this.userServ.getOneProfileData(this.ratingPersonId,localStorage.getItem("sessionUserType"),this.uuidValue,localStorage.getItem("auth")).subscribe(
        //   (response)=>{
        //     console.log(response)
        //   }
        // )

      },
      err => {
        console.log("no rating found");

      }
    )



    // get partner Balance
    if (localStorage.getItem("sessionUserType") == 'partner') {
      this.userServ.getBalance(localStorage.getItem("userId"), "partner", this.uuidValue, localStorage.getItem("auth")).subscribe(
        (response: any) => {
          console.log("balance object ==== ");
          // console.log(response.data);
          this.partnerBalance = response.data[0].totalBalance;


        },
        err => {
          console.log("no balance found");
          console.log(err);


        }
      )

    }



  }

  getRaterProfile(profileID) {
    console.log("----------- single profile id -------------- ");
    console.log(profileID);
    this.userServ.getOneProfileData(profileID, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response) => {
        console.log(response)
      }
    )
  }

  onChange($event: Event) {
    const file = ($event.target as HTMLInputElement).files[0];
    this.uploadServ.convertToBase64(file);
    this.uploadServ.myimage.subscribe(
      (upData) => {
        console.log(typeof (upData));
        this.uploadImageForm.controls['image'].setValue(upData);
        this.uploadImage();
      }
    )
  }



  // const userProfileData = {
  //   profileId:localStorage.getItem("userId"),
  //   email:localStorage.getItem("email")
  // }
  // this.imageServ.retrieveImageFromServer(userProfileData,
  //   localStorage.getItem("sessionUserType"),
  //   this.uuidValue,
  //   localStorage.getItem("auth")

  //   ).subscribe(
  //     (userImageResponse:any)=>{
  //       console.log("user profile image exist");
  //       console.log(userImageResponse);
  //       this.userImageBase = userImageResponse.data.body.data.image;


  //     },
  //     err=>{
  //       console.log("user profile image is not found");
  //       console.log(err);
  //       this.userImageBase = "default";

  //     }
  //   )

  signOut() {
    this.route.navigate(["/login"]);
    localStorage.clear();
  }

  uploadImage() {

    // this.uploadImageForm = new FormGroup({
    //   image: new FormControl(null, Validators.required),
    //   profileId: new FormControl(localStorage.getItem("userId")),
    //   email: new FormControl(localStorage.getItem("email"))

    // });

    let formData = new FormData();
    formData.append('image', this.uploadImageForm.get("image").value);
    formData.append('profileId', this.uploadImageForm.get("profileId").value);
    formData.append('email', this.uploadImageForm.get("email").value);
    console.log(this.uploadImageForm.value);
    // console.log(formData);

    this.showLoaderMaster = true;

    this.imageServ.uploadImageToServer(
      this.uploadImageForm.value,
      localStorage.getItem("sessionUserType"),
      this.uuidValue,
      localStorage.getItem("auth")
    ).subscribe(
      (response: any) => {
        console.log("image uploaded successfully");
        console.log(response);
        // this.userImageBase = response.data.body.data.image;
        this.showLoaderMaster = false;
        localStorage.setItem("userImage", response.data.image);
        this.showUploadImageMessage = true;

        this.ngOnInit();



        // this.retrieveImage();

        // this.headerObj.ngOnInit();
        this.route.navigateByUrl('/afterLoginHeader', { skipLocationChange: true }).then(() => {
          this.route.navigate(['/profile']);

        });


      },
      err => {
        console.log("error in upload");
        console.log(err);
        this.showLoaderMaster = false;
        this.showUploadImageMessage = false;
        this.showUploadImageMessageFail = true;

      }
    )

  }
  // retrieveImage() {
  //   const userProfileData = {
  //     profileId: localStorage.getItem("userId"),
  //     email: localStorage.getItem("email")
  //   }
  //   this.imageServ.retrieveImageFromServer(userProfileData,
  //     localStorage.getItem("sessionUserType"),
  //     this.uuidValue,
  //     localStorage.getItem("auth")

  //   ).subscribe(
  //     (userImageResponse: any) => {
  //       console.log("user profile image exist");
  //       console.log(userImageResponse);
  //       if(this.userImageBase==null){
  //         this.userImageBase = "default";
  //         this.imageServ.profileImagePathShared.next("default");
  //       }
  //       else{
  //       this.imageServ.profileImagePathShared.next(userImageResponse.data.body.data.image);
  //       this.userImageBase = userImageResponse.data.body.data.image;
  //     }



  //     },
  //     err => {
  //       console.log("user profile image is not found");
  //       console.log(err);
  //       this.userImageBase = "default";

  //     }
  //   )
  // }
  // localStorage.getItem("userId"),localStorage.getItem("sessionUserType"),this.uuidValue,localStorage.getItem("auth")
  // update profile method
  updateProfile() {
    console.log(this.editForm.value);
    this.userServ.updateUserProfile(this.editForm.value, localStorage.getItem("userId"), localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (updateResponse: any) => {
        console.log("data updates successfully");
        console.log(updateResponse);
        this.showEditSuccessMessage = true;
        this.ngOnInit();


      },
      err => {
        console.log("something went wrong in update method");
        console.log(err);


      }
    )


  }
  closeDialog() {
    this.showEditSuccessMessage = false;
    this.showUploadImageMessage = false;
    // this.ngOnInit();
  }

  closeDialogFail(){
    this.showUploadImageMessageFail = false;
  }
  resetPassword() {
    console.log(this.resetPasswordForm.value);
    if (this.resetPasswordForm.get("newPassword").value != this.resetPasswordForm.get("reNewPassword").value) {
      this.showPasswordMatchError = true;

    }
    else {
      this.showPasswordMatchError = false;
      this.userServ.resetPasswordInProfile(this.resetPasswordForm.value, localStorage.getItem("sessionUserType"), this.uuidValue).subscribe(
        (response) => {
          console.log("password reseted successfully");
          console.log(response);
          this.showResetPasswordMessage = true;
          this.signOut();


        },
        err => {
          console.log("something went wrong in reseting password");
          console.log(err);
          this.showResetPasswordMessage = false;


        }
      )
    }

  }


  getUserImage() {

    const userProfileData = {
      profileId: localStorage.getItem("userId"),
      email: localStorage.getItem("email")
    }

    this.imageServ.retrieveImageFromServer(userProfileData,
      localStorage.getItem("sessionUserType"),
      this.uuidValue,
      localStorage.getItem("auth")

    ).subscribe(
      (userImageResponse: any) => {
        console.log("user profile image exist");
        console.log(userImageResponse);
        this.userImageBase = userImageResponse.data.body.data.image;
        if (this.userImageBase == null) {
          this.userImageBase = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAADsQAAA7EB9YPtSQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAABz0SURBVHic7Z15cFzVmeh/5/btRbtsS8L7RrxgBwLBhsEwgGx2SKBeIFPJG8hLzUzevECoMG8mC8kkDglDFkgIYV5CEmaSqqm8sIYkBEPAeGEztgAvSMardmHL2qVWL3f53h9t2Vp6uX1vd0vK41flKuv2veec7vPdc77zfd/5juIvDBHRdjazSPOxEpsVlm2fZ1mcbYosEpsSEJ+AD8ES0E8+FgbiQBToBroVdIrQKkiT8mlHbcz9G5YFG5VSMmlfLg+oyW6AV95ukbkWXAZcAKwFzgOKx98ngIhg22DZgmUJti1k2ZuDwD6BXaBes/C9dtVK1eH9W0we004A6uslEC2j1oaPodiAsNJtWSJg24JpCaadEAgXHFCwSYTno7q+9bplKua2PZPBtBAAEdHqWlgvis8quB6oyEc9toBh2hiWIO6EoR+R3+PTHi8f8P15zRpl5LqNuWZKC8DORpmtaXxGFP8AnFnIui1bME3BsGzEjSwojiM8hmX/fP3qYH3OG5gjpqQA7GqWK1DcDtzAaUVtUhABw7KJGy4FIaF+bBJ4YMNK/8u5bZ13ppQA1DXLJQL3oKid7LaMRwDTtImbrnUFgLdB3VO7wveHqbKamBIC8GabXKSEu5Vww2S3xQmGKcQNG9vlkADUIXx9/Vn+F3LZLjdMqgC82SbLlc1DCq6ezHa4YWREiLmfGkB4SYl9V+2q4Lu5bFs2TIoAbBHRS1q4XSnuBUomow25whaIGRam6Xo0MIAfhUr0jesWqEgOm+aIggvAriY5D41fAh8tdN35xLSEaNxyPxoodVhE/mehFcWCCcDrrVKkw3eVcAegFareQiJANGZhWq5HA0GpX4QHfXd9bI0azmHTUlIQAajrkIVi8gQJc+1fPIZH3UBgn7LsTxXCfpD3N3FXq1wnJu/w/0nnA/h1jeKQD01z934pOBuf9uaWA+bf5LhpE8ibAIiItrNF7kH4IzAzX/VMVTSlKAn60H2uB9kSEfnt5gPG/RtF8tZPeZkC6jqkWAyeQHFdPsqfbkTjNoZpu35eCb8jpH+6domK5rBZibJzXWDdEakQP88Cl+S67OmMYdrE4na27udTKNgS8ek3XbdMDeSyXTkVgNdbZaZfeA64MJfl/qVgWkIkbuFaCuAtQ9evu/pDqjNXbcqZALzeKvP8wovAWbkq0ymGYfDe0aO8f/w4AwNDDISHEPdm2lOEh8O0NjcC4NN15pwxmxuuuoYzFy9yXaZpCZGY5fp5gUOamFfVnlXU5LqQUeREAHa0yXyfzXZgSS7Kc0prx/u8sG07DYcOEYvHc16+ZRhEh3rGXVV8ePWH+ad//Dya5k43MywhFrM8DATqiLJ8l9SuVsdcFzFSktcCdhyScj3IdoGPeC3LKYNDQzy16Xne2rvPi0MmI8kFIMGyD63ga3f9k+uyveoEwF4V1C+rXaL63BfhcRlYVyd+X5AnC9n57e8f4/s/e4Rde/bmtfMzcejwAV6v2+X6eb+uEQh4+vnPkZj55OP1EvBSiOsWiIiya/gVcKWXBmTD0ZYWHvjFL+np6y9UlWl59oXnPT0f0DX8uich2DDLZz72uIjPbQGua69r4z4Fn3b7fLb09PXz89/8Ni9zvVu6urs8lxEMaPhcWgwBFNxUdcD8N7fPuxKAXc1yM8KX3VaaLSLCo799jMGhoUJV6QgjHsO03Rt4IKGEFQV9KG/a2L+8/J55o5sHsxaAne2yAMUjbipzy1v73qWpra2QVTpCRPj5r//TczlKQXHQ9SgOoEAe3XZYFrh40DlbRPTSNrYhrMu2IrfYInzrhw/S1dtbqCpPkW4VMBp/IEBJcQmVlZVcfsmlXH6Ru5/HMG2icQ8jivBmeVj/62zC0bMaAUpb2VjIzgdobG2dlM7PBiMep6+vl6amRn71X7/mXzZ+k8GhwazL0XUNn3vnESgu7C81v53NI44FoK5NaoGvZt0oj+xp2F/oKj1z4sQx/vW+e7PWDxQQCmie9AEFX3p5v3GZ0/sdCUB9vQTE5mdO788lR5qbC11lTujr6+W3Tz+V9XOaUgT8nn5mBfyfujrxO6rPyU2RMr4ELPfSKrf0D2Q/lE4Vdux609VzAV1D97A0RLFqoNT8opNbMwpAXYcslEkY+iGhAA4MTq2lXzaEw2HXzwa9WQkBNm5ukIxeq4y1iMUDJNluXQhsy8Ky3XvOJhsRm2jc3WZhTVNerYTFaOb9GetJ9+HOZtmAcLOXVnyAe4J+zwrhzS8fMDakuyftxkul+J776gvL/JklXHvOAqrLijgxGOGtpi72tHRjud/HB0BQ9/HJC1ewfuV8qkpCnBiK8tMte9jVeDxHLU+NUgl9IGZ4sg3cA2xO9XFKAahrkasEzndfc+H42HmL+PL15+L3nR7Q/v4yGIoZvN3Uxf72XvZ39NHcM0RnfyTl8szv06gpC7GoqoyVcypZu3Am580qQo3yOi6pLOaCW9fz1L4mvvm7N/L+3QK6Rtz0sP0M1m0+aFy6Ybl/e7IPUwqAKL7kxVldKM6aO4O7bzgvaQh2adDPpSvmcOmKOaeu2SJ0D0WJW8JgJOFYKisKEPApZpWG0EaPuaYJA8mUUOETZy/izSPHeW7v0Vx/pbGohOs47mEUUDZ3A0kFIKkOsLNF1iKknTumCrdcsDSr+HtNKarLiphXWczKOZWsnFPJvMpiqsuKxna+Az5f++Fsm+sKj8ogwNUvHYivTfZB0pIVfMVrjYViSXXZpNVdUxoqSD2aAr/uzV2oRN2dtOzxF3a0yjLgJk+1FZCAz5MXzRPZjhheCHgcBRTcuPlQdEKanQmlasJtya5/wOSiacrLLiMApWzf300od/QfIqIKGeWTC0pDjkzeecHvxVzrAt2rLiB8dryPYEyJdS2sA5Z6q6VwLKoqY3ZF0aTV7wMuWT6vYPV5HAEAZg+WmmOU+7EjgOK/e62hUPg0xf++5uzJbgY/uPlidF9hZkyFdyGwlRqz4/hUy+vqxK/gFk+lFwClFKvnzeTh2y7mwjPPmOzmUKZrbP/SJ7jxo4VJY+h1GlAiN40OJT8lTrta5VoS+/qmDLZpcNbw22OuBf26Z43YMSkNQSlQTLDYvTHjQgKBHPrSBAYjpqcilMaVtcv9L8FoS6DNtVMjadxohLIiT/seCosUIOWKSkwDHtLQIBbXAi/BaB1ATb1Ubb5JXOPnilAgmPMyvewjOMk1I//R4GSo9yRF/KRDFdDQMp3wFDgKoFi1vUHmwEkBUBYXe2/WBxQKt7mHRmMqax2cFABRXOS5xA8oGAq8xQwCIBfDiA4gUzODl0w9rdQF+fkOmvdp4AIA7aT5tzB+zSwRFHE1eaZer4jmw86TW8XnXT/6sIgo7a1WlgKlOWhTXujUqie7Ca7pL85f210mJxlNxcv7WajbwqqprGwf087AFo0q6aZIoqhpEKZk6zp9oRqOlqzIWx05WSH5rFU608D50+mrppNqQhJjtbl/CguBYn/V+YR9+Q9SUSrxz1OSFLEXa0rhPuVVgYmqIFGVe8NKrrB1vSCdP4LXgBSFWqIhLMxRewpCXE1d07ClCnu8kfK+FFykoZhWWlZEFSYOD4As7e0xf2E3UHnVAxWqWlNQlZPWFIhwIQ8YkexCsQf9lXlqSAo8DgACszSZZpm8B7SywhmIstnfr6AzMDt/bUlWpfefYZbGJG38dIuFjwGtQIqW6XxjquEvwtAKq5/k4DUo1oCpq1Wl4IRWiFlLwHIuAJ1F8/PYllR4FoHgtBSAPlWRf2XQMB0vsm2fn/dDhQsOHSEHU0BQw0vy8kmkXZub3wpizhNSHitdxBQ5gzNrNGDqpN7Mgj6tgl4tT1q3bUPcWdxdPFBCRyjr9Hy5wfurG5u2AgDQ4puPQR68hZEoTn5d8WkcrJg8R2oOhu6YBhTkfLp8YODniL4kt8tCy3I2/CtFc/lZRLXJXER5FoFhDejOQUsmjSFVwmHf0twJQdjZ6a0d5UvpCtTkpk6X5CBbfpcGeE95Pcn0a+Uc1pdiK4/G0eFIYi9AOpSivWIZHaHJd6HkYAro1lDTXwAA+lU57/mWE8Xl8jAWg2j6jF6i6xyecQ7vhyZjzT8R8Zj/CKRLE2F6puJMwrAqosG/ghhZuoxjRuLtT4nCCpWwZ+ZF9PmnjuXca/crVIuuFE3T0xKQHBuNiAoRFIf5+SIxiKTp/EAAikIM6jMwC+zuzYTXAUCUNOrKojF/B5NOYWyB4WGIJ8msrusQ8Cf+5SD4Lh8IeD4zSdAadQsapuZXzDPxeKJzQ8GETVXTwOcDn5YTG2u+ERHvc4Dla9AuWEQTkNPjSKcFoSAUFyX+FYUgGADdNy06H7LzVKegf/1ZtGhKKUHxbg7a9AEFxGsGVGCfUiox+ytwfwDeB0wKloft4QAIO2EkrMzmNc8t+oCCYnseAdRrcFIAbJtXPLdoCtDT189zm/9MtKgi53N5pKicJ5/9PSe6Mx8ilW9sW7zqf2KbvtMCcMESdQzhgPemTQ49fX08+exz3PPgj1FWhLKqWcRm5s5UG58xn/KqKkK68O2HfsKvn3yKE92T50Lxkh0EAEXDFWer4zA6RYxiE5C/vUx5oLOrmxe2bWPn3r3YVkItvvnqRKoDs2QmyowT6H/fUx1mySyMskTk/M1XrWPTq2+zc/ce6vbt44JzzuGayy+jetYsb18kS7wqgErYNPL/UwKgYJOAo3NmJpsTPT28uP1V3njn7VMdDzCvZhYLZ5+OFzQqZqMsA/+QO3eHFSonNvN0sMeSeTXMnlXJse4+bMtmxzu72bl7D+euXsX1G9Yzu7owWyy8jgCiOHXo8SkBqIixrS9IP1DhqfQ88n5nJ3/e/gq79u5DkiyEz1u5ZMK1+Mz5aLaBbzi7A6dtf4hY1eIJusR5Zy1l06unM5fZIrz9bj276xtYtXw5N2xYz4K5c8gXpul5+dfbZeqndL5TArBsmYrtbJFnFHzGaw25pu39Y/zhpc00HDyYsICl4JwVi5NcVURnLabIOowWc3aIk/h0YtVLEW1ikqpzli8eIwAj2CK8e+AA9QcOsmrFcj5+xQbmz8n9PgHT8moBUk9/crU6FfEyxruhFI8hU0cAegfDPPHcJva8u89R9MPsqhQxgkojWrWU0PGDaGYGJ5HSiFYvxdaTexTnVKePQxSE+gMHqD94kNVnreamq69k7qwZGdvuBBEwPc7/ti2Pjf57rAAc5yWp4RhQ2C0uo+jsG6C+sZX6o22c6Ounq6necehL9YzUs5f4dGI1ZxI6fhBlpQ76iM1ciB1Ivf2saka5o7YgQv3+eo5HoLKslJUL57JqyXwW1sxyvbffssRrFFCH77i+ZfSFMQKwZo0y6lrkPwt5TqCI0NLZTUNjGw3NbQyMDslSCk33YxuZY/Q0paiqTL9jyNaDRKvPpOj4oaT7/uKVczBL0r+tVZUOBQDw6QFQir6hMDsaDrGj4RAloSAfmjeb1Uvn86F5s/Fl4W00TM9H1f9Hba0aI/0THNyWzS80jS+TxzMDTMviSMdxDrS8z4HmdobSROIUV9Qw1JX56HilKXwOkjbbgWKiVUsIdR0dM7KYJTMwyjMPfLruPHllceXEVUE4GmPPkWb2HGmmKBBg6dwali+cy6pF8wj4U8cb2CJeh3+xfdavxl+cUOOFi1XjrlbZhHC9l9rGY1oWDY1t1De3c6T9GIbDfXehskoiAyewMhzAmE14lFWUWN4Fu1sSfwdLic10mCfD4Rjs8wcJlqbXFyLxOPVNbdQ3tfGs7uPMebNZvWgeKxfPI6CP7RrDo/Yvij9tWBY6Mv56UpFTigckRwIQicXZtns/uw81EYm72IKgFMWVNQx2tqa9LdvgCLNkFpoZRw/3Eqta4th07LSa4hk1WZmjDdPiveZ23mtuJ/iGn/NXLOGvz1lJcSiICMQ9Dv8C3092PemYuWa+2gK85alGYPfhZh566nneqD/orvNPEiitRHeQczeaLLon3f0Roa++FfE5D/WKOajDFwgRyPD2p63DMHj93YP8+MlN7D3cnJj7PeUC4s0rVviT+nvSTZrfdl2fCC/u2sfvtu9kOEOkrRMUUJRkPh1PTxap3a33Guj5/kP0PvUc4UcfRRyeUdzdn/k08+KK6pzsUojGDZ7ctoN/f+IZLC8RID6Vsi9TCsDaher3QNbnn4vAM6/U8eq+97J9NC16MHNmkPe7nFn7hl7dQffDv8Q6GQk8tGsv3T/5OfZwNOOzHQ7q8BflLouJGYvQcayDZ15+2d0SULFj/XL9T6k+Tq82C/+abX2v7N3P7sNN2T6WEbEyD711B9rS/0i2Td/TfyT8X/8XGaeEWvvfo/uBH2P29KZug0DdwcwrEsvMbipKWZ9tY8YSO/fqDx/m1XcmWiAd8PV0H6YVgLWL1IsoUkrPeI719LPlnXqntztHhOG+zA6dI63HCKcYySUWo+tnjxL780spn7fbO+j57g+JNrVMfB4IW3C0rTNjOyL9nTnZt2XEwsgoe8W2XXV0dGaufxS/X7/Cn/LgaHCw1tcSHsKME7kI/OG1uhxEqkwsONxzjPhw5rjVjuNdmAKRcUJgDg7R9d0fYu3NHPooAwMM/OhhYqPmegGGLTAFOo5l7oB4eJCh7nZPQmBbJmZ87L5dW2w2vfaq02JjyrL+OdNNGQXg/AXqMIoHM93XeKyT9hO5j5YJ9xwj0u/MndvTm5ifYzYMmRC1YNiEcLAEZjr32WvrLiJSXMagmXjrB0wYObu5b8BZAHV0oJdwr8sj5gXikcGkmn/78U4a2zNPQwL3164OHc50nyNrnwHfUnAo3T11+yfYGDxjxqOOOx8gFh0mEk0sN02BqA1xAVEK/2duRVVnzi2kFi5E//jHgUSaQMM+/SIPDkeJRTMriiNE+rqw4s7vH8EyIthm6mXz2w37MxVxUAvq33FSlyMBWLdARUTxOVKsRm1bONzuUtrTMKIAOUVEeH1Pisi2oiL8f/93ifj/VBQV4f/s/0jsD0jCa2/vz3JYF4yos+3mp56wbWKR9MvZw60tWKkTWIlo/EPtEuVI8hzb+9cuUFsVPJDss2M9fcSM3Gi+o9H07LN/1O1LPeqpuXPx3/q3KS10/k9/ClWVeqp4uz77Uc6Xxr4/HgFikf6MCSrjhsHxFMGpAt/fsNy/3Wmd2e127ORuzmAdwrrRl7v68rOxKBAqRdN17Ex79kdxtKU97efamWfin5/8wEntzPSJ0xtbs4sv1HQ//pDzoxjM2LAjzyfAib4e5taMM44pdlQM6lkt3bPy+K1ZowxL8TeMSyox7MHMmxalCJVltx27u7snraNJmptSP9ySeqd8NBanpyc7JTdUNsOxP8C2DIxIZivjCMMTdZETStNvWbNGZTUUZ+3y/av5qg3FbcCpcSpbG3w2hMpnoZKEZqXCtky27WpIfUOaTpbW1J9tfvNdx+ZiAKX5KCp3ltBSbJtYOLuYRcMYMyraCm6rXaYyLw/G4crnv3aB2iTqtHdJ5TG/gObTHfkBRrP9rTTr/TQCQPNEA9AIr7+TUfMeQ3FlNcrJwZcC8Uh/VsI18tyo/95Xu9L/fOqbU+M66GPtfL6m4HG3z2dDcUWVI2/gCEcbU7wIAwNIf+o3Tfr7Un7e2Oz85dKDIYoqnL39RnQQy+G8nxx57JUV+jfcPu1aAJRSdtEgtwq84LaMLCqjtGq+Yw/bcHiI/Uc7JlxPO/+PkGSE2H+0neiwsyWpAkpmzXM09xvRMEaWS91xvBz1+T+zUSnXrkJPYV+rV6t4vIhbYnFj4q+dY/RQMcFyp9Y84U9bd068nG74H6F14jTwxy07ceqQD1bMwh/KnDvQjEcxolmcTD6OmGG0K0u/8bplypO/3XPc3yXVajBsWNfOKC3Je8bR0pmz8TmcCvbsn2i4lCSdO+Ge5olCsqf+oKM6ff4AJTOSLzFHY8ajjnwbqagsKzNMw7yhdrVyL0EnyUng5799+vy9F35k+V9VlBbnd+usplFWswjlIB9geHCQ90brAr294MSOPzgAfaddwvsOtxIZdrChRKlE2zKsWE53vjvNuay4pO+jS1dd/IPP1e52VcA4chb5e+eVy96JxuPLyUEoWTr0QJCSWc4yhT/z0qh4ljRLvAm0nB4pnnnxDUePlFbNQw+mz1FoGVHikX48xHft7hscWv6Nz16Qs4QeOQ39/t3d/607HmID8Houyx1PqHwGIQcxd3tHTQPJhvZU2KN0hYaDRzO3p6wyYfRJgxEbTqz1Xfa9wE4z5lv/yk/uPOGuhOTkPPb/pa98sn8YrgaeznXZoympmoceLEp7T3R4mJ37EvZ7J/P/KU4Kyxu7DxKLpNfS9WBxQutPhSSWetlY+SYWIY+XDwdqX/3p51OHK7nEuYktC5q2PhE/tPXxJ5bV7o8Bl5MHQVNKESgpJx7uT7pTeIQT/cNsWD4f3nQ2lANgxGHlKh5++mV60oSIaf4AFbOXoKUw+IjYxIf7MV24hAEEbFBf2/bgHV88+NaavJhb85giUMlz37zlPg11BZBVHJNTNJ9O+ezFaRWvw0eOEjmSvRcvcvgwRxpTTxtK81FxxiI0Pbk/TSyT6FAvluF6lTak4BPbHrzjvnzaWvOeI/LZjbdsVfguAnKitY7HFwhRVjM/peHFsiy2vJK9XvriK3XYqTaRKkVZzQJ8geRKn2VEiQz1IGk2oaZFqbfwsXbrg194xl0BzilIktA/bfzE0WHCF4F8izycUBIoLqeseh6pzu15pTX7AeiV1lSRSIrSqrkEiiduRE0M+QMnlT1XL62Jku9VV3St2/rAF3IbV5+CgqfFvPaeJ89Ttv0fwLm5LjvS10m4J3lk0g/mh1gScPZ1m2I2/9yefOgumTk7qXPKMuPEhweyd+qcZj+K27b+6At1bgtwQ8HTBG/6xs3vDFO9FsUXyfFxNUWVNSk9h5sHnQ/Hzw8k78Si8lkTyhfbIh7uJzbU67bzIyj1HSpLP1rozodJPuvsmm8/vkKz+C5wY87aIsJQVxvRwb4xl4s0xc8WhijJIPJDNvxjS5TouPD2UPkMSkc7eQTM+DBGdGzsfjYtVYonLYMvb3/4C41uCsgFUyIz8jUbnzxHw/46cEtOChRh8EQbsaGxQvC3M3VuqkwfZ/hEr8FjvWNHi2BJBWU1C052vmDGYxjRIS/D/RtK1F1bfnxH1lvvcs2UEIARrtv42KUKda/AJZ4LSyIEM3yKny4Moaf41oYI/6slRt+oNGyBknLKaxYCCsuIEI+G3Xe8qC1KuH/LQ7dvym8YjXOmlACMcM23ntigRO5UcANe9BQRBjpbiIdPO4Furw5QW5bcbvDigMUjXacXKcGSCkqr52GZcYzYsKtlnYCtFM+h5N6tP7xzR/ZfIr9MSQEY4fqNTy21sT8HcqsCd2fFijDY2Xoq5m6eX/Hg/OCERE0iwhfb47THE/N5sLiMYMVMrHjM3RyvaET4DZi/3PrgXU2u2l4AprQAjHDL44/7wg1cCfIpUB8Dssu7JkL4RBuRk9PBV2cHOL947CjwZtjiB8cTb38wWISvpBQXP88JFI+JqN9se/D2HVNlmE/HtBCA0Zz/yCP+M47NuBzhegVXCKx29KAI0e4OhgZ6WBrU+N7cAAqQuIEdjfHVXo2jtkZ5MIhRUuH0hzER6pRiC7baLDO7tm3duNGl+W9ymHYCMJ6r731qjmZalyrhAgUXAOcKJN2NIbaJ2d1B/2A/XymK8xE7Crbwlujcb5ZQFQoyXFxOqp9FEj6Nd0F2K9G2FNn29k0/uXNaH7cz7QVgIqKu+87TC5VlrhRhhWWa59pG7GzbMhfbtlmmFL4Z4R5djwxzrz6EAr5ultEXKI5FSsqPkTg/6Tio40qkU5ADotGgx7WGzf9+x7Q+ZjcZ/w/7ToVj4kgx1AAAAABJRU5ErkJggg==";
        }
        localStorage.setItem("userImage", this.userImageBase);


      },
      err => {
        console.log("user profile image is not found");
        console.log(err);
        // this.userImageBase = "default";
        localStorage.setItem("userImage", "data:image/png;base64,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");

      }
    )

  }

}
