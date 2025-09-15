import { listSent } from "@/services/interviewRequest.service";
import { InterviewRequestsType } from "@/types/request.types";
import React, { useContext, useEffect, useState } from "react";
import Flex from "./ui/Flex";
import ImageCircle from "./common/ImageCircle";
import Link from "next/link";
import moment from "moment";
import StarRating from "./common/StarRating";
import {
  getRatingByIntId,
  getRatingsGivenService,
  getRatingsRecivedService,
  giveRatingService,
  updateRatingService,
} from "@/services/ratingService";
import { RatingsType } from "@/types/ratings.types";
import { TabContext } from "@/context/TabContext";

export default function Ratings() {
  const { currentTab } = useContext(TabContext);

  return (
    <div className="w-full ">
      {currentTab == 0 && <GiveRating></GiveRating>}
      {currentTab == 1 && <RatingsGiven></RatingsGiven>}
      {currentTab == 2 && <RatingsRecived></RatingsRecived>}
    </div>
  );
}

function GiveRating() {
  const [completedInterviews, setCompletedInterviews] = useState<
    InterviewRequestsType[]
  >([]);
  useEffect(() => {
    const fetchCompletedInt = async () => {
      const res = await listSent("desc", "completed");
      setCompletedInterviews(res);
    };
    fetchCompletedInt();
  }, []);
  return (
    <div className="w-[100%] flex flex-col items-center justify-start gap-2 ">
      {completedInterviews?.map((int) => (
        <GiveRatingCard interview={int} key={int.id} />
      ))}
    </div>
  );
}

function RatingsGiven() {
  const [ratings, setRatings] = useState<RatingsType[]>([]);
  useEffect(() => {
    const fetchRatings = async () => {
      const data = await getRatingsGivenService();
      setRatings(data);
    };
    fetchRatings();
  }, []);
  return (
    <Flex variant="col" justify="center" items="center">
      {ratings?.map((rat) => (
        <ShowRatingCard rating={rat} key={rat.id} />
      ))}
    </Flex>
  );
}
function RatingsRecived() {
  const [ratings, setRatings] = useState<RatingsType[]>([]);
  useEffect(() => {
    const fetchRatings = async () => {
      const data = await getRatingsRecivedService();
      setRatings(data);
    };
    fetchRatings();
  }, []);
  return (
    <Flex variant="col" justify="center" items="center">
      {ratings?.map((rat) => (
        <ShowRecivedRatingCard rating={rat} key={rat.id} />
      ))}
    </Flex>
  );
}

function GiveRatingCard({ interview }: { interview: InterviewRequestsType }) {
  const [isUpdate, setIsUpdate] = useState(false);
  const [rate, setRate] = useState(1);
  const [review, setReview] = useState("");
  const giveRating = async () => {
    if (!isUpdate) {
      await giveRatingService(interview.id, rate, review);
      setIsUpdate(true);
    } else await updateRatingService(interview.id, rate, review);
  };
  useEffect(() => {
    const fetchRating = async () => {
      const rating = await getRatingByIntId(interview.id);
      setRate(rating.rating);
      setReview(rating.review);
      if (rating.rating > 0) {
        setIsUpdate(true);
      }
    };
    fetchRating();
  }, [interview.id]);
  return (
    <Flex
      className="border-2 border-myprimary rounded-md bg-secondary p-2 w-full md:w-[40%]"
      items="start"
      gap="xl"
    >
      {/* info */}
      <Flex variant="row" justify="start" gap="md">
        <div className=" col-span-1 flex justify-center items-center ">
          <ImageCircle link={interview.touser.image} width={60} height={60} />
        </div>
        <div className="col-span-2">
          <Link
            href={`/user/${interview.touser.id}`}
            className="font-semibold text-lg "
          >
            {interview.touser?.name}
          </Link>

          <p className="text-[12px] text-gray-500">
            {moment(interview.createdAt).format("DD-mm-yyyy")}
          </p>
        </div>
        <div className="px-4 py-2 bg-green-400 text-green-100 rounded-md">
          {interview.status}
        </div>
      </Flex>
      {/* rating section */}

      <StarRating
        rate={rate}
        review={review}
        setRate={setRate}
        setReview={setReview}
        onClick={giveRating}
        show={false}
      />
    </Flex>
  );
}
function ShowRatingCard({ rating }: { rating: RatingsType }) {
  return (
    <Flex
      className="border-2 border-myprimary rounded-md bg-secondary p-2 w-full md:w-[40%]"
      items="start"
      gap="xl"
    >
      {/* info */}
      <Flex variant="row" justify="start" gap="md">
        <div className=" col-span-1 flex justify-center items-center ">
          <ImageCircle
            link={rating.interviewer?.image}
            width={60}
            height={60}
          />
        </div>
        <div className="col-span-2">
          <Link
            href={`/user/${rating.interviewer?.id}`}
            className="font-semibold text-lg "
          >
            {rating.interviewer?.name}
          </Link>

          <p className="text-[12px] text-gray-500">
            {moment(rating.interview?.createdAt).format("DD-mm-yyyy")}
          </p>
        </div>
        <div className="px-4 py-2 bg-green-400 text-green-100 rounded-md">
          {rating.interview?.status}
        </div>
      </Flex>
      {/* rating section */}

      <StarRating
        rate={rating.rating}
        review={rating.review as string}
        show={true}
      />
    </Flex>
  );
}
function ShowRecivedRatingCard({ rating }: { rating: RatingsType }) {
  return (
    <Flex
      className="border-2 border-myprimary rounded-md bg-secondary p-2 w-full md:w-[40%]"
      items="start"
      gap="xl"
    >
      {/* info */}
      <Flex variant="row" justify="start" gap="md">
        <div className=" col-span-1 flex justify-center items-center ">
          <ImageCircle link={rating.User?.image} width={60} height={60} />
        </div>
        <div className="col-span-2">
          <Link
            href={`/user/${rating.userId}`}
            className="font-semibold text-lg "
          >
            {rating.User?.name}
          </Link>

          <p className="text-[12px] text-gray-500">
            {moment(rating.interview?.createdAt).format("DD-mm-yyyy")}
          </p>
        </div>
        <div className="px-4 py-2 bg-green-400 text-green-100 rounded-md">
          {rating.interview?.status}
        </div>
      </Flex>
      {/* rating section */}

      <StarRating
        rate={rating.rating}
        review={rating.review as string}
        show={true}
      />
    </Flex>
  );
}
