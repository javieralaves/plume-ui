"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardStat,
} from "../components/Card";
import { BarChart3, ArrowRight } from "lucide-react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Textarea } from "../components/Textarea";

export function CardDemo() {
  const handleClick = () => {
    console.log("Card clicked");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Card</h2>
        <p className="text-gray-500 dark:text-gray-400">
          A versatile container for displaying content and actions.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Basic Usage</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <div className="text-lg font-semibold">Card Title</div>
              <p className="text-text-secondary">Card subtitle</p>
            </CardHeader>
            <CardBody>
              <p>
                This is the main content of the card. You can put any content
                here, including text, images, or other components.
              </p>
            </CardBody>
            <CardFooter>
              <Button variant="secondary" onClick={handleClick}>
                Learn More
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardBody>
              <p>A simple card with only body content.</p>
            </CardBody>
          </Card>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">With Stats</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardBody>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-text-secondary" />
                <CardStat
                  label="Total Sales"
                  value="$12,345"
                  trend={{ value: 12, direction: "up" }}
                />
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-text-secondary" />
                <CardStat
                  label="Revenue"
                  value="$8,674"
                  trend={{ value: 5, direction: "down" }}
                />
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-text-secondary" />
                <CardStat
                  label="Profit"
                  value="$3,671"
                  trend={{ value: 8, direction: "up" }}
                />
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Interactive Cards</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card
            className="cursor-pointer hover:border-primary transition-colors"
            onClick={handleClick}
          >
            <CardBody className="flex items-center justify-between">
              <div>
                <div className="font-semibold">View Analytics</div>
                <p className="text-text-secondary">Check your performance</p>
              </div>
              <ArrowRight className="w-5 h-5 text-text-secondary" />
            </CardBody>
          </Card>

          <Card
            className="cursor-pointer hover:border-primary transition-colors"
            onClick={handleClick}
          >
            <CardBody className="flex items-center justify-between">
              <div>
                <div className="font-semibold">Account Settings</div>
                <p className="text-text-secondary">Manage your preferences</p>
              </div>
              <ArrowRight className="w-5 h-5 text-text-secondary" />
            </CardBody>
          </Card>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Form Card</h3>
        <div className="max-w-md">
          <Card variant="form">
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <h4 className="text-lg font-semibold text-text-primary">
                  Contact Form
                </h4>
                <p className="text-text-secondary">
                  Fill in your details below
                </p>
              </CardHeader>
              <CardBody>
                <div>
                  <Input
                    label="Full Name"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    label="Email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <Textarea
                    label="Message"
                    placeholder="Enter your message"
                    required
                  />
                </div>
              </CardBody>
              <CardFooter>
                <Button variant="secondary" type="button">
                  Cancel
                </Button>
                <Button type="submit">Submit</Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
}
