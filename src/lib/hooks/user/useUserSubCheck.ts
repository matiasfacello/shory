import { useEffect, useState } from "react";
import { api } from "~/utils/api";

interface Plan {
  name: string;
  title: string;
  linkQuota: number;
  canCreateLink: boolean;
  starts?: Date;
  ends?: Date;
}

const useUserSubCheck = (id: string) => {
  const [info, setInfo] = useState<Plan>();

  const { data: subscription } = api.subscription.get.useQuery({ userId: id });
  const { data: freePlan } = api.subscription.getPlan.useQuery({ name: "tier0" });
  const { data: linkCount } = api.link.count.useQuery({ userId: id });

  useEffect(() => {
    if (!linkCount) return;

    //Checks if user has active subscription
    if (subscription) {
      setInfo({
        name: subscription.plans.name,
        title: subscription.plans.title,
        linkQuota: subscription.plans.linkQuota,
        canCreateLink: linkCount < subscription.plans.linkQuota ? true : false,
        starts: subscription.startDate,
        ends: subscription.endDate,
      });
    }
    // else returns free plan
    else if (freePlan) {
      setInfo({
        name: freePlan.name,
        title: freePlan.title,
        linkQuota: freePlan.linkQuota,
        canCreateLink: linkCount < freePlan.linkQuota ? true : false,
      });
    }
  }, [freePlan, subscription, linkCount]);

  return info;
};

export default useUserSubCheck;
